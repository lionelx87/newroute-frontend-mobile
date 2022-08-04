import { Injectable } from "@angular/core";
import { Plugins } from "@capacitor/core";

const { Storage } = Plugins;

@Injectable({
  providedIn: "root",
})
export class InterestService {
  constructor() {}

  async store(interests: number[]) {
    await Storage.set({
      key: "interests",
      value: JSON.stringify(interests),
    });
  }

  async get() {
    const { value } = await Storage.get({ key: "interests" });
    return JSON.parse(value);
  }
}
