const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const initialRecords = require('./initialData');

const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS acquisitions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    budget INTEGER,
    unit TEXT,
    type TEXT,
    quantity INTEGER,
    unitPrice INTEGER,
    totalValue INTEGER,
    acquisitionDate TEXT,
    provider TEXT,
    documentation TEXT
  )`);

    db.run(`CREATE TABLE IF NOT EXISTS history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT DEFAULT CURRENT_TIMESTAMP,
    action TEXT,
    acquisition_id INTEGER,
    detail TEXT,
    acquisition_info TEXT
  )`);

    // Poblar la base de datos con registros iniciales
    initialRecords.forEach(record => {
        db.run(`INSERT INTO acquisitions (budget, unit, type, quantity, unitPrice, totalValue, acquisitionDate, provider, documentation)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [record.budget, record.unit, record.type, record.quantity,
                record.unitPrice, record.totalValue, record.acquisitionDate, record.provider,
                record.documentation], function (err) {
                if (err) {
                    console.error(`Error al insertar registro inicial: ${err.message}`);
                } else {
                    const acquisitionId = this.lastID;
                    db.run(`INSERT INTO history (action, acquisition_id, detail, acquisition_info)
                                VALUES (?, ?, ?, ?)`,
                        ['Creacion', acquisitionId, 'Nueva adquisicion creada', JSON.stringify(record)],
                        function (err) {
                            if (err) {
                                console.error(`Error al insertar registro de historial: ${err.message}`);
                            }
                        });
                }
            });
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});

// Validación de la adquisición
const validateAcquisition = (acquisition) => {
    if (!acquisition.budget || !acquisition.unit || !acquisition.type || !acquisition.quantity ||
        !acquisition.unitPrice || !acquisition.totalValue || !acquisition.acquisitionDate || !acquisition.provider ||
        !acquisition.documentation) {
        return 'Todos los campos son obligatorios';
    }

    if (typeof acquisition.budget !== 'number' || typeof acquisition.quantity !== 'number' ||
        typeof acquisition.unitPrice !== 'number' || typeof acquisition.totalValue !== 'number' ||
        typeof acquisition.acquisitionDate !== 'string' || typeof acquisition.provider !== 'string' ||
        typeof acquisition.documentation !== 'string') {
        return 'Tipos de datos incorrectos';
    }

    return null; // Datos válidos
};

// Endpoint para obtener todas las adquisiciones
app.get('/acquisitions', (req, res) => {
    db.all('SELECT * FROM acquisitions', (err, rows) => {
        if (err) {
            res.status(500).send(`Error: ${err.message}`);
        } else {
            res.json(rows);
        }
    });
});

// Endpoint para obtener el historial de una adquisición
app.get('/acquisitions/:id/history', (req, res) => {
    const {id} = req.params;
    db.all('SELECT * FROM history WHERE acquisition_id = ?', id, (err, rows) => {
        if (err) {
            res.status(500).send(`Error: ${err.message}`);
        } else {
            const parsedRows = rows.map(row => {
                try {
                    return {
                        ...row,
                        acquisition_info: JSON.parse(row.acquisition_info)
                    };
                } catch (error) {
                    console.error('Error al parsear acquisition_info:', error);
                    return row;
                }
            });
            res.json(parsedRows);
        }
    });
});

// Endpoint para crear una nueva adquisición
app.post('/acquisitions', (req, res) => {
    const newAcquisition = req.body;
    const validationError = validateAcquisition(newAcquisition);
    if (validationError) {
        return res.status(400).send(validationError);
    }

    db.run(`INSERT INTO acquisitions (budget, unit, type, quantity, unitPrice, totalValue, acquisitionDate, provider, documentation)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [newAcquisition.budget, newAcquisition.unit, newAcquisition.type, newAcquisition.quantity,
            newAcquisition.unitPrice, newAcquisition.totalValue, newAcquisition.acquisitionDate, newAcquisition.provider,
            newAcquisition.documentation],
        function (err) {
            if (err) {
                res.status(500).send(`Error: ${err.message}`);
            } else {
                const acquisitionId = this.lastID;
                db.run(`INSERT INTO history (action, acquisition_id, detail, acquisition_info)
                      VALUES (?, ?, ?, ?)`,
                    ['Creacion', acquisitionId, 'Nueva adquisicion creada', JSON.stringify(newAcquisition)],
                    function (err) {
                        if (err) {
                            res.status(500).send(`Error: ${err.message}`);
                        } else {
                            // Respondemos con un mensaje simple indicando éxito
                            res.status(201).json({message: 'Adquisición creada correctamente'});
                        }
                    });
            }
        });
});

// Endpoint para actualizar una adquisición
app.put('/acquisitions/:id', (req, res) => {
    const {id} = req.params;
    const updatedAcquisition = req.body;
    const validationError = validateAcquisition(updatedAcquisition);
    if (validationError) {
        return res.status(400).send(validationError);
    }

    db.run(`UPDATE acquisitions
          SET budget = ?, unit = ?, type = ?, quantity = ?, unitPrice = ?, totalValue = ?, acquisitionDate = ?, provider = ?, documentation = ?
          WHERE id = ?`,
        [updatedAcquisition.budget, updatedAcquisition.unit, updatedAcquisition.type,
            updatedAcquisition.quantity, updatedAcquisition.unitPrice, updatedAcquisition.totalValue,
            updatedAcquisition.acquisitionDate, updatedAcquisition.provider,
            updatedAcquisition.documentation, id],
        function (err) {
            if (err) {
                res.status(500).send(`Error: ${err.message}`);
            } else {
                db.run(`INSERT INTO history (action, acquisition_id, detail, acquisition_info)
                      VALUES (?, ?, ?, ?)`,
                    ['Modificacion', id, 'Adquisicion modificada', JSON.stringify(updatedAcquisition)],
                    function (err) {
                        if (err) {
                            res.status(500).send(`Error: ${err.message}`);
                        } else {
                            res.status(200).send({message: 'Adquisición modificada correctamente'});
                        }
                    });
            }
        });
});

// Endpoint para desactivar una adquisición
app.delete('/acquisitions/:id', (req, res) => {
    const {id} = req.params;

    // Verificar si el ID existe antes de eliminar
    db.get('SELECT * FROM acquisitions WHERE id = ?', id, (err, row) => {
        if (err) {
            return res.status(500).send(`Error: ${err.message}`);
        }
        if (!row) {
            return res.status(404).send('ID de adquisición no encontrado');
        }
        const acquisitionInfo = {...row}; // Copiar la información de la adquisición

        // Si el ID existe, proceder con la eliminación
        db.run('DELETE FROM acquisitions WHERE id = ?', id, (err) => {
            if (err) {
                res.status(500).send(`Error: ${err.message}`);
            } else {
                db.run(`INSERT INTO history (action, acquisition_id, detail, acquisition_info)
                  VALUES (?, ?, ?, ?)`,
                    ['Desactivacion', id, 'Adquisicion desactivada', JSON.stringify(acquisitionInfo)],
                    function (err) {
                        if (err) {
                            res.status(500).send(`Error: ${err.message}`);
                        } else {
                            // Respondemos con un mensaje simple indicando éxito
                            res.status(200).json({message: 'Adquisición desactivada correctamente'});
                        }
                    });
            }
        });
    });
});
