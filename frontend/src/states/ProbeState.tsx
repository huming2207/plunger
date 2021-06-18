import { makeAutoObservable, runInAction } from 'mobx';
import { ProbeDevice, ProbeStatus } from '../common/ProbeTypes';
import { Probes } from 'plunger-binding';
import { identifyTarget } from '../common/MainProcessBindings';

export class ProbeState {
  public targetName = 'STM32F103C8Tx';
  public connectedProbes: ProbeDevice[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  public setTargetName(targetName: string): void {
    this.targetName = targetName;
  }

  public setConnectedProbe(probes: Probes): void {
    if (probes.probes.length < 1) {
      this.connectedProbes = [];
      return;
    }

    for (const newProbe of probes.probes) {
      // Clean old probes
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

      this.connectedProbes = [...this.connectedProbes, { status: ProbeStatus.IDLE, info: newProbe }];
    }

    for (const currProbe of this.connectedProbes.slice()) {
      for (const newProbe of probes.probes) {
        // Skip existing
        if (
          newProbe.pid === currProbe.info.pid &&
          newProbe.vid === currProbe.info.vid &&
          currProbe.info.serialNum === newProbe.serialNum
        ) {
          continue;
        }

        // Add new probe
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
        updatedProbes.push({ status: probe.status, info: probe.info, targetChipId: target.uniqueId });
      } catch (err) {
        console.warn(`No target found for probe ${probe.info.shortId}, ${probe.info.serialNum}, error ${err}`);
        updatedProbes.push({ status: probe.status, info: probe.info, targetChipId: undefined });
      }
    }

    runInAction(() => {
      this.connectedProbes = updatedProbes;
    });
  }
}

export const ProbeStateInstance = new ProbeState();
