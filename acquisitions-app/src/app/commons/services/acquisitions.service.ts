import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAcquisition, IAcquisitionHistoryLog, IAcquisitionResponse } from '@commons/entities/acquisition.entities';

@Injectable({
  providedIn: 'root'
})
export class AcquisitionsService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }

  public getAcquisitions(): Observable<IAcquisitionResponse[]> {
    return this.http.get<IAcquisitionResponse[]>(`${this.baseUrl}/acquisitions`);
  }

  public getAcquisitionHistoryById(acquisitionId: number): Observable<IAcquisitionHistoryLog[]> {
    return this.http.get<IAcquisitionHistoryLog[]>(`${this.baseUrl}/acquisitions/${acquisitionId}/history`);
  }

  public createAcquisition(acquisition: IAcquisition): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/acquisitions`, acquisition);
  }

  public updateAcquisition(acquisitionId: number, acquisition: IAcquisition): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/acquisitions/${acquisitionId}`, acquisition);
  }

  public deleteAcquisition(acquisitionId: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/acquisitions/${acquisitionId}`);
  }
}
