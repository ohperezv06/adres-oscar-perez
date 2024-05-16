import { combineReducers } from '@ngrx/store';
import { featureLoadAcquisitions as loadAcquisitions } from '@store/reducers/load-acquisitions.reducer';
import { featureCreateAcquisition as createAcquisition } from '@store/reducers/create-acquisition.reducer';
import { featureUpdateAcquisition as updateAcquisition } from '@store/reducers/update-acquisition.reducer';
import { featureDeleteAcquisition as deleteAcquisition } from '@store/reducers/delete-acquisition.reducer';
import { featureLoadAcquisitionHistory as loadAcquisitionHistory } from '@store/reducers/load-acquisition-history.reducer';

export const acquisitionsRootReducer = combineReducers({
  loadAcquisitions,
  createAcquisition,
  updateAcquisition,
  deleteAcquisition,
  loadAcquisitionHistory
})