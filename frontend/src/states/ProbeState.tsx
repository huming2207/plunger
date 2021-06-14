import { makeAutoObservable } from 'mobx';
import { ProbeDevice, ProbeStatus } from '../common/ProbeTypes';
import { Probes } from 'plunger-binding';

export class ProbeState {
  public connectedProbes: ProbeDevice[] = [];

  constructor() {
    makeAutoObservable(this);
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
}

export const ProbeStateInstance = new ProbeState();
