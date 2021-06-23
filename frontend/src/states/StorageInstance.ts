import level from 'level';

export enum StoreType {
  Initialised = 'init',
  TargetName = 'targetName',
  FirmwarePath = 'firmwarePath',
  FirmwareType = 'firmwareType',
  ProbeMaxSpeed = 'probeMaxSpd',
  SkipVerify = 'skipVerify',
  SuccessCount = 'successCnt',
  FailCount = 'failCnt',
}

export const StoreInstance = level('settings');
