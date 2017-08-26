import * as models from '.';
export interface ISavedState {
  sdaId: number;
  sda?: models.ISda;
  newSda: boolean;
  Timestamp: Date;
}

