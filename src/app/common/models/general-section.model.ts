export interface IGeneralSection {
  id?: number;
  sdrNumber?: string;
  station?: string;
  department?: number;
  aircraftNo?: string;
  manufacturer?: string;
  model?: string;
  serialNo?: string;
  totalShipTime?: number;
  cycles?: number;
  fleet?: string;
  originator?: string;
  lineMaintenance?: boolean;
  alertCode?: number;
  ataCode1?: number;
  ataCode2?: number;
  defectDiscoveredDuring?: string;
  unscheduledMaintenanceDescription?: string;
  checkType?: number;
  routineNo?: string;
  nonRoutineNo?: string;
  micNo?: string;
  createDate?: Date;
}