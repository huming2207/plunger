import { ipcMain } from 'electron';
import { listAllProbes } from 'plunger-binding';

export enum MessageChannel {
  PROBE_DETECT_REQUEST = 'probe-detect-req',
  PROBE_DETECT_RESPONSE = 'probe-detect-resp',
}

export const registerHandlers = () => {
  ipcMain.handle(MessageChannel.PROBE_DETECT_REQUEST, async () => {
    const probes = listAllProbes();
    return probes;
  });
}