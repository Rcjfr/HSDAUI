export interface ISdaListView {
  id: number;
  aircraftNo: string;
  createDate: Date;
  status: number;
  statusText: string;
  station: string;
  routineNo: string;
  nonRoutineNo: string;
  hasOriginal: boolean;
}
