import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Spot } from '../interfaces/spot.interface';

const { Storage } = Plugins;


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async all() {
    const spots: Spot[] = [];
    const { keys } = await Storage.keys();
    await keys.forEach( async key => {
      const { value } = await Storage.get({ key });
      spots.push( JSON.parse(value) );
    });
    return spots;
  }

  async get(spot: Spot) {
    const { value } = await Storage.get({ key: spot.id.toString() });
    return JSON.parse(value);
  }

  async store(spot: Spot) {
    const ret = await Storage.get({ key: spot.id.toString() });
    if(!ret.value) {
      spot.priority = { name: 'media', value: 3 };
      await Storage.set({
        key: spot.id.toString(),
        value: JSON.stringify(spot)
      });
    }
  }

  async update(spot: Spot) {
    await Storage.set({
      key: spot.id.toString(),
      value: JSON.stringify(spot)
    });
  }

  async delete(spot: Spot) {
    await Storage.remove({ key: spot.id.toString() });
  }
  
}
