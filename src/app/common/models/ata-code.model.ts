export interface ATACode {
    Code: string;
    Name: string;
    Description?: string;
    SecondaryCodes?: Array< ATACode >;
}
