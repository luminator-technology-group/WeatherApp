import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  processLocation(stopList: any[]): { name: string }[] | null {
    if (stopList && stopList.length > 0) {
      return stopList.map(item => ({ name: item.name,}));
    } else {
      return null;
    }
  }
}
