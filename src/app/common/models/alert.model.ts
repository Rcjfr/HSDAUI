export interface Alert {
    sdaId: string;
    sdrNumber?: string;
    createDate: Date;
    lineMaintenance: boolean;
    alertCode: string;
    ataCode1: string;
    ataCode2: string;
    aircraftNo: string;
    station: string;
    department: string;
    manufacturer: string;
    model: string;
    serialNo: string;
    totalShipTime: string;
    cycles: string;
    fleet: string;
    scheduledMaintenance: boolean;

}
