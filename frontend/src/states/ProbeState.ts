import { makeAutoObservable, runInAction, toJS } from 'mobx';
import { ProbeDevice, ProbeStatus } from '../common/ProbeTypes';
import { Probes } from 'plunger-binding';
import { identifyTarget } from '../common/MainProcessBindings';
import { SettingStateInstance } from './SettingState';

export class ProbeState {
  public connectedProbes: ProbeDevice[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  public setProbeStatusByShortId(status: ProbeStatus, shortId: number): void {
    const updatedProbes = toJS(this.connectedProbes).map((probe) => {
      if (probe.info.shortId === shortId) {
        const updatedProbe = probe;
        updatedProbe.status = status;
        return updatedProbe;
      } else {
        return probe;
      }
    });

    runInAction(() => {
      this.connectedProbes = updatedProbes;
    });
  }

  public setPrevTargetId(prevId: string, shortId: number): void {
    console.log('Set prev target ID: ', prevId);
    const updatedProbes = toJS(this.connectedProbes).map((probe) => {
      if (probe.info.shortId === shortId) {
        const updatedProbe = probe;
        updatedProbe.prevTargetId = prevId;
        return updatedProbe;
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
        this.connectedProbes = [
          ...this.connectedProbes,
          { status: ProbeStatus.IDLE, info: newProbe, prevTargetId: '' },
        ];
      }
    }
  }

  public async refreshTargetInfo(): Promise<void> {
    if (this.connectedProbes.slice().length < 1) {
      return;
    }

    const updatedProbes: ProbeDevice[] = [];
    for (const probe of this.connectedProbes.slice()) {
      if (probe.status !== ProbeStatus.ERASING && probe.status !== ProbeStatus.FLASHING) {
        try {
          console.log('Identify target', SettingStateInstance.targetName);
          const target = await identifyTarget(
            SettingStateInstance.targetName,
            probe.info.vid,
            probe.info.pid,
            probe.info.serialNum,
          );
          console.log('Target', target);
          updatedProbes.push({ ...probe, status: ProbeStatus.WAIT, targetChipId: target.uniqueId });
        } catch (err) {
          console.warn(`No target found for probe ${probe.info.shortId}, ${probe.info.serialNum}, error ${err}`);
          updatedProbes.push({ ...probe, status: ProbeStatus.IDLE, targetChipId: undefined });
        }
      }
    }

    runInAction(() => {
      this.connectedProbes = updatedProbes;
    });
  }
}

export const ProbeStateInstance = new ProbeState();
