import { Injectable } from '@angular/core';
import { Plugins } from "@capacitor/core";
import { Settings } from '../interfaces/settings.interface';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() { }

  async store(settings: Settings) {
    await Storage.set({
      key: "settings",
      value: JSON.stringify(settings),
    });
  }

  async get() {
    const { value } = await Storage.get({ key: "settings" });
    return JSON.parse(value);
  }

}
