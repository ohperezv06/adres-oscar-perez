export interface IAcquisition {
  budget: number;
  unit: string;
  type: string;
  quantity: number;
  unitPrice: number;
  totalValue: number;
  acquisitionDate: string;
  provider: string;
  documentation: string;
}

export interface IAcquisitionResponse extends IAcquisition {
  id: number;
}

export interface IAcquisitionHistoryLog {
  id: number;
  date: string;
  action: string;
  acquisition_id: number,
  detail: string;
  acquisition_info: IAcquisition
}