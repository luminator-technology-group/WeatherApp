import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoordinatesService {


  processCoordinates(stopList: any[]): { latitude: number, longitude: number }[] | null {
    if (stopList && stopList.length > 0) {
      return stopList.map(item => ({ latitude: item.latitude, longitude: item.longitude }));
    } else {
      return null;
    }
  }
}
