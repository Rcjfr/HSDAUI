export interface CheckType {
    Code?: string;
    Name: string;
}
export interface FleetCheckType {
    Fleet: string;
    CheckTypes: Array<CheckType>;
}
