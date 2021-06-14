import { ipcRenderer, OpenDialogReturnValue } from 'electron';
import { Probes } from 'plunger-binding';
import { InvokeType } from './MessageTypes';

export const listAllProbes = async (): Promise<Probes> => {
  return ipcRenderer.invoke(InvokeType.PROBE_DETECT_REQUEST);
};

export const openFirmwareChooseDialog = async (): Promise<OpenDialogReturnValue> => {
  return ipcRenderer.invoke(InvokeType.FW_FILE_OPEN_REQUEST);
};
