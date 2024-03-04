import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoordinatesService {

  constructor() { }

  processCoordinates(stopList: any[]): { latitude: number, longitude: number } | null {
    if ( stopList && stopList.length > 0) {
      const latitude = stopList[0].latitude;
      const longitude = stopList[0].longitude;
      return { latitude, longitude}
    }else {
    return null
  
  } 
  }
}