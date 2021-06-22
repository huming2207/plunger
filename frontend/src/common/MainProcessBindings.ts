import { ipcRenderer, OpenDialogReturnValue } from 'electron';
import { FirmwareType, Probes, TargetIdentity } from 'plunger-binding';
import { InvokeType } from './MessageTypes';

export const listAllProbes = async (): Promise<Probes> => {
  return ipcRenderer.invoke(InvokeType.PROBE_DETECT_REQUEST);
};

export const openFirmwareChooseDialog = async (): Promise<OpenDialogReturnValue> => {
  return ipcRenderer.invoke(InvokeType.FW_FILE_OPEN_REQUEST);
};

export const identifyTarget = async (
  targetName: string,
  vid: number,
  pid: number,
  serialNum?: string,
): Promise<TargetIdentity> => {
  return await ipcRenderer.invoke(InvokeType.IDENTIFY_REQUEST, targetName, vid, pid, serialNum);
};

export const eraseTarget = async (targetName: string, vid: number, pid: number, serialNum?: string): Promise<void> => {
  return ipcRenderer.invoke(InvokeType.ERASE_REQUEST, targetName, vid, pid, serialNum);
};

export const flashFirmwareFile = async (
  path: string,
  targetName: string,
  type: FirmwareType,
  vid: number,
  pid: number,
  skip_erase?: boolean,
  speed_khz?: number,
  serialNum?: string,
): Promise<void> => {
  return ipcRenderer.invoke(
    InvokeType.FW_FLASH_REQUEST,
    path,
    targetName,
    type,
    vid,
    pid,
    skip_erase,
    speed_khz,
    serialNum,
  );
};
