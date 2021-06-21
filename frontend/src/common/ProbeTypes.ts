import { ProbeInfo } from 'plunger-binding';

export enum ProbeStatus {
  IDLE = 'Waiting to connect',
  WAIT = 'Waiting to start',
  ERASING = 'Erasing',
  FLASHING = 'Flashing',
  SUCCESS = 'Success',
  ERROR = 'Error',
  REPEATED = 'Repeated, try new ones',
}

export interface ProbeDevice {
  info: ProbeInfo;
  status: ProbeStatus;
  targetChipId?: string;
  prevTargetId: string;
}
