import { ProbeInfo } from 'plunger-binding';

export enum ProbeStatus {
  IDLE = 'Waiting',
  ERASING = 'Erasing',
  FLASHING = 'Flashing',
  SUCCESS = 'Success',
  ERROR = 'Error',
}

export interface ProbeDevice {
  info: ProbeInfo;
  status: ProbeStatus;
  targetChipId?: string;
}
