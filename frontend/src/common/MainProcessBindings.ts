import { ipcRenderer, OpenDialogReturnValue } from 'electron';
import { Probes, TargetIdentity } from 'plunger-binding';
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
  return ipcRenderer.invoke(InvokeType.IDENTIFY_REQUEST, targetName, vid, pid, serialNum);
};
