export enum Status {
  Open = 0,
  Complete = 1,
  Audited = 2,
  Rejected = 4,
  Closed = 8,
  Deleted = 16
}

export enum Source {
  HSDA = 1,
  EMX = 2,
  ME0308 = 3,
  CPCP = 4,
  MRT = 5
}

export enum DTEStatus {
  Open = 1,
  Closed = 2,
  TBD = 3
}

export enum CorrosionLevel {
  Level1 = 1,
  Level2 = 2,
  Level3 = 3
}

export enum SearchType {
  Regular = 1,
  MRR = 2,
}


export enum RepairDocumentType {
        AARD = 1,
        AARDwithSupportingEA = 2,
        AMM = 3,
        EA = 4,
        ECO = 5,
        DNF_ESO = 6,
        Field_EA = 7,
        MCM = 8,
        MRB = 9,
        Shop_ESO = 10,
        Shop_ESO_with_supporting_EA = 11,
        SRM_with_supporting_EA = 12,
        SRM = 13,
        BCSRPP = 14,
        Drawing_Part_Replacement_Only = 15,
        Other_EmpowerMX_Only = 16,
    }
