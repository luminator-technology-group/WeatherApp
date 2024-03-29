import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StopListService {
  private stops: any[] = [];


  updateStops(stops: any[]): void {
    this.stops = stops;
  }

  getStops(): any[] {
    return this.stops;
  }
}
