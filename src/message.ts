import { BrowserWindow, dialog, ipcMain } from 'electron';
import { eraseTarget, FirmwareType, flashFirmwareFile, identifyTarget, listAllProbes } from 'plunger-binding';

export enum InvokeType {
  PROBE_DETECT_REQUEST = 'probe-detect-req',
  FW_FILE_OPEN_REQUEST = 'firmware-open-req',
  IDENTIFY_REQUEST = 'identify-target-req',
  ERASE_REQUEST = 'erase-target-req',
  FW_FLASH_REQUEST = 'firmware-flash-req',
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

  ipcMain.handle(
    InvokeType.IDENTIFY_REQUEST,
    async (_event, targetName: string, vid: number, pid: number, serialNum?: string) => {
      return await identifyTarget(targetName, vid, pid, serialNum);
    },
  );

  ipcMain.handle(
    InvokeType.ERASE_REQUEST,
    async (_event, targetName: string, vid: number, pid: number, serialNum?: string) => {
      return await eraseTarget(targetName, vid, pid, serialNum);
    },
  );

  ipcMain.handle(
    InvokeType.FW_FLASH_REQUEST,
    async (
      _event,
      path: string,
      targetName: string,
      type: FirmwareType,
      vid: number,
      pid: number,
      skip_erase?: boolean,
      speed_khz?: number,
      serialNum?: string,
    ) => {
      return await flashFirmwareFile(path, targetName, type, vid, pid, skip_erase, speed_khz, serialNum);
    },
  );
};
