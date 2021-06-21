import { autorun, makeAutoObservable, runInAction, toJS } from 'mobx';
import { ProbeDevice, ProbeStatus } from '../common/ProbeTypes';
import { FirmwareType, Probes } from 'plunger-binding';
import { eraseTarget, flashFirmwareFile, identifyTarget } from '../common/MainProcessBindings';

export class ProbeState {
  public targetName = 'STM32F103C8Tx';
  public firmwareType = '';
  public startState = false;
  public firmwarePath = '';
  public connectedProbes: ProbeDevice[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  public setTargetName(targetName: string): void {
    this.targetName = targetName;
  }

  public setFirmwarePath(path: string): void {
    this.firmwarePath = path;
  }

  public setStartState(state: boolean): void {
    this.startState = state;
  }

  public setFirmwareType(type: FirmwareType): void {
    this.firmwareType = type;
  }

  public setProbeStatusByShortId(status: ProbeStatus, shortId: number): void {
    const updatedProbes = toJS(this.connectedProbes).map((probe) => {
      if (probe.info.shortId === shortId) {
        const newProbe = probe;
        newProbe.status = status;
        return newProbe;
      } else {
        return probe;
      }
    });

    runInAction(() => {
      this.connectedProbes = updatedProbes;
    });
  }

  public setConnectedProbe(probes: Probes): void {
    if (probes.probes.length < 1) {
      this.connectedProbes = [];
      return;
    }

    this.connectedProbes = this.connectedProbes.slice().filter((device) => {
      for (const newProbe of probes.probes) {
        if (
          newProbe.pid === device.info.pid &&
          newProbe.vid === device.info.vid &&
          newProbe.serialNum === device.info.serialNum
        ) {
          return true;
        }
      }

      return false;
    });

    for (const newProbe of probes.probes) {
      console.log('new probe', probes.probes, toJS(this.connectedProbes));
      if (
        !toJS(this.connectedProbes).some((e) => {
          return newProbe.pid === e.info.pid && newProbe.vid === e.info.vid && e.info.serialNum === newProbe.serialNum;
        })
      ) {
        this.connectedProbes = [...this.connectedProbes, { status: ProbeStatus.IDLE, info: newProbe }];
      }
    }
  }

  public async refreshTargetInfo(): Promise<void> {
    if (this.connectedProbes.slice().length < 1) {
      return;
    }

    const updatedProbes: ProbeDevice[] = [];
    for (const probe of this.connectedProbes.slice()) {
      try {
        const target = await identifyTarget(this.targetName, probe.info.vid, probe.info.pid, probe.info.serialNum);
        updatedProbes.push({ status: ProbeStatus.WAIT, info: probe.info, targetChipId: target.uniqueId });
      } catch (err) {
        console.warn(`No target found for probe ${probe.info.shortId}, ${probe.info.serialNum}, error ${err}`);
        updatedProbes.push({ status: ProbeStatus.IDLE, info: probe.info, targetChipId: undefined });
      }
    }

    runInAction(() => {
      this.connectedProbes = updatedProbes;
    });
  }
}

export const ProbeStateInstance = new ProbeState();

export const startFirmwareFlashAutoRun = (): void => {
  autorun(async () => {
    if (ProbeStateInstance.startState) {
      for (const probe of toJS(ProbeStateInstance.connectedProbes)) {
        if (probe.status !== ProbeStatus.IDLE && probe.status !== ProbeStatus.WAIT) {
          continue;
        }

        const errHandler = (err: Error) => {
          ProbeStateInstance.setProbeStatusByShortId(ProbeStatus.ERROR, probe.info.shortId);
          console.log(err);
          ProbeStateInstance.setStartState(false);
        };

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
                ProbeStateInstance.setStartState(false);
              })
              .catch((err) => errHandler(err));
          })
          .catch((err) => errHandler(err));
      }
    }
  });
};
