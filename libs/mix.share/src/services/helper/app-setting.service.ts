import { Injectable } from '@angular/core';

export interface AppSetting {
  hideTourGuide: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public key = 'mix-app-setting';
  public appSetting: AppSetting = {
    hideTourGuide: false
  };

  constructor() {
    const saveData = localStorage.getItem(this.key);
    if (saveData) this.appSetting = JSON.parse(saveData) as AppSetting;
  }

  public toggleTourGuide(value: boolean) {
    this.appSetting.hideTourGuide = value;
    localStorage.setItem(this.key, JSON.stringify(this.appSetting));
  }
}
