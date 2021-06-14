import { BrowserWindow, dialog, ipcMain } from 'electron';
import { listAllProbes } from 'plunger-binding';

export enum InvokeType {
  PROBE_DETECT_REQUEST = 'probe-detect-req',
  FW_FILE_OPEN_REQUEST = 'firmware-open-req',
}

export const registerHandlers = (window: BrowserWindow): void => {
  ipcMain.handle(InvokeType.PROBE_DETECT_REQUEST, async () => {
    const probes = listAllProbes();
    return probes;
  });

  ipcMain.handle(InvokeType.FW_FILE_OPEN_REQUEST, async () => {
    const result = await dialog.showOpenDialog(window, {
      title: 'Choose a firmware blob',
      filters: [
        { name: 'Firmware blob', extensions: ['bin', 'elf', 'hex', 'ihex'] },
        { name: 'All files', extensions: ['*'] },
      ],
    });

    return result;
  });
};
