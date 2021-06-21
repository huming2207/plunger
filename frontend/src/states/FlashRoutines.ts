import { toJS } from 'mobx';
import { eraseTarget, flashFirmwareFile } from '../common/MainProcessBindings';
import { ProbeDevice, ProbeStatus } from '../common/ProbeTypes';
import { ProbeStateInstance } from './ProbeState';

export const onFirmwareFlashError = (err: Error, probe: ProbeDevice): void => {
  ProbeStateInstance.setProbeStatusByShortId(ProbeStatus.ERROR, probe.info.shortId);
  console.log(err);
};

export const onEraseAndDownload = async (probe: ProbeDevice): Promise<void> => {
  console.log('Probe target:', probe.prevTargetId, probe.targetChipId);
  if (
    probe.prevTargetId === probe.targetChipId &&
    probe.targetChipId !== undefined &&
    probe.prevTargetId !== undefined
  ) {
    console.warn('Repeated');
    ProbeStateInstance.setProbeStatusByShortId(ProbeStatus.REPEATED, probe.info.shortId);
    return;
  }

  ProbeStateInstance.setProbeStatusByShortId(ProbeStatus.ERASING, probe.info.shortId);
  eraseTarget(ProbeStateInstance.targetName, probe.info.vid, probe.info.pid, probe.info.serialNum)
    .then(() => {
      console.log(`Done erasing for ${probe.info}, target ${probe.targetChipId}`);
      ProbeStateInstance.setProbeStatusByShortId(ProbeStatus.FLASHING, probe.info.shortId);

      flashFirmwareFile(
        ProbeStateInstance.firmwarePath,
        ProbeStateInstance.targetName,
        ProbeStateInstance.firmwareType as any,
        probe.info.vid,
        probe.info.pid,
        true, // Skip erase as we do erase elsewhere
        5000, // 5MHz speed
        probe.info.serialNum,
      )
        .then(() => {
          console.log(`Done flashing for ${probe.info}, target ${probe.targetChipId}`);
          ProbeStateInstance.setProbeStatusByShortId(ProbeStatus.SUCCESS, probe.info.shortId);
          ProbeStateInstance.setPrevTargetId(probe.targetChipId || '', probe.info.shortId);
          setTimeout(() => {
            ProbeStateInstance.setProbeStatusByShortId(ProbeStatus.IDLE, probe.info.shortId);
          }, 2000);
        })
        .catch((err) => onFirmwareFlashError(err, probe));
    })
    .catch((err) => onFirmwareFlashError(err, probe));
};

export const intervalTickHandler = async (): Promise<void> => {
  console.log('Ticking');
  for (const probe of toJS(ProbeStateInstance.connectedProbes)) {
    if (
      probe.status === ProbeStatus.IDLE ||
      probe.status === ProbeStatus.ERROR ||
      probe.status === ProbeStatus.REPEATED
    ) {
      await ProbeStateInstance.refreshTargetInfo();
      continue;
    }

    if (probe.status === ProbeStatus.WAIT) {
      await onEraseAndDownload(probe);
      continue;
    }
  }
};
