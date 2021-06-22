import { makeAutoObservable, runInAction } from 'mobx';
import { FirmwareType } from 'plunger-binding';
import { StoreInstance, StoreType } from './StorageInstance';

export class SettingState {
  public targetName = '';
  public firmwareType = '';
  public firmwarePath = '';
  public successCount = '0';
  public failCount = '0';
  public maxSpeedKhz = '0';

  constructor() {
    makeAutoObservable(this);
  }

  public async initFromDisk(): Promise<void> {
    try {
      const init = await StoreInstance.get(StoreType.Initialised);
      if (!init) {
        await this.setTargetName('');
        await this.setFirmwareType('bin' as any);
        await this.setFirmwarePath('');
        await this.setSuccessCount(0);
        await this.setFailCount(0);
        await StoreInstance.put(StoreType.Initialised, true);
      }
    } catch (err) {
      console.error('Something wrong on settings', err);
      await StoreInstance.clear();
      await this.setTargetName('');
      await this.setFirmwareType('bin' as any);
      await this.setFirmwarePath('');
      await this.setSuccessCount(0);
      await this.setFailCount(0);
      await StoreInstance.put(StoreType.Initialised, true);
    }

    runInAction(async () => {
      this.targetName = await StoreInstance.get(StoreType.TargetName);
      this.firmwareType = await StoreInstance.get(StoreType.FirmwareType);
      this.firmwarePath = await StoreInstance.get(StoreType.FirmwarePath);
      this.successCount = await StoreInstance.get(StoreType.SuccessCount);
      this.failCount = await StoreInstance.get(StoreType.FailCount);
      this.maxSpeedKhz = await StoreInstance.get(StoreType.ProbeMaxSpeed);
    });
  }

  public async setTargetName(targetName: string): Promise<void> {
    this.targetName = targetName;
    await StoreInstance.put(StoreType.TargetName, targetName);
  }

  public async setFirmwarePath(path: string): Promise<void> {
    this.firmwarePath = path;
    await StoreInstance.put(StoreType.FirmwarePath, path);
  }

  public async setFirmwareType(type: FirmwareType): Promise<void> {
    this.firmwareType = type;
    await StoreInstance.put(StoreType.FirmwareType, type);
  }

  public async bumpSuccessCount(): Promise<void> {
    const value = parseInt(this.successCount);
    runInAction(() => {
      if (isNaN(value)) {
        this.successCount = '0';
      } else {
        this.successCount = (1 + value).toString(10);
      }
    });

    await StoreInstance.put(StoreType.SuccessCount, this.successCount);
  }

  public async bumpFailCount(): Promise<void> {
    const value = parseInt(this.failCount);
    runInAction(() => {
      if (isNaN(value)) {
        this.failCount = '0';
      } else {
        this.failCount = (1 + value).toString(10);
      }
    });

    await StoreInstance.put(StoreType.FailCount, this.failCount);
  }

  public async setSuccessCount(value: number): Promise<void> {
    runInAction(() => {
      if (isNaN(value)) {
        this.successCount = '0';
      } else {
        this.successCount = value.toString(10);
      }
    });

    await StoreInstance.put(StoreType.SuccessCount, this.successCount);
  }

  public async setFailCount(value: number): Promise<void> {
    runInAction(() => {
      if (isNaN(value)) {
        this.failCount = '0';
      } else {
        this.failCount = value.toString(10);
      }
    });

    await StoreInstance.put(StoreType.FailCount, this.failCount);
  }

  public async setMaxSpeedKhz(value: string): Promise<void> {
    runInAction(() => {
      this.maxSpeedKhz = value;
    });

    await StoreInstance.put(StoreType.ProbeMaxSpeed, value);
  }
}

export const SettingStateInstance = new SettingState();
