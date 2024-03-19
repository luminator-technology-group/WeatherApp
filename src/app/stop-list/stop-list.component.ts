import { Component, Input } from '@angular/core';
import { StopButtonService } from '../stop-button.service';

@Component({
  selector: 'app-stop-list',
  template: `
    <div class="stop-list-container">
      <div *ngIf="stops.length === 0">
        <p>Not found</p>
      </div>
      <div class="stop-list-item" *ngFor="let stop of displayedStops">
        <div class="stop-name">
          <button class="circle" (click)="handleButtonStop()"></button>
          <p>{{ stop.name }}</p>
        </div>
        <div class="arrival-time">
          <p>{{ calculateArrivalTime(stop.expectedArrivalTime) }}</p>
        </div>
        <div class="weather-info">
          <app-weather-temperature [weatherTemperature]="weatherTemperature"></app-weather-temperature>
          <app-weather-icon [weatherIconValue]="weatherIconValue"></app-weather-icon>
          <app-weather-wind [weatherWind]="weatherWind"></app-weather-wind>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./stop-list.component.scss'],
})
export class StoplistComponent {
  @Input() stops: any[] = [];
  @Input() weatherIconValue = 0;
  @Input() weatherData: any;
  @Input() weatherWind = 0;
  @Input() weatherTemperature = 0;

  displayedStops: any[] = [];


  constructor(private stopButtonService: StopButtonService) {}
  //stop buton 
  handleButtonStop() {
    this.stopButtonService.notifyButtonClick();
  }




  ngOnChanges() {
    this.updateDisplayedStops();
  }

  updateDisplayedStops() {
    this.displayedStops = this.stops
      .filter(stop => this.calculateArrivalTime(stop.expectedArrivalTime) !== 'Already arrived' && this.getMinutesRemaining(stop.expectedArrivalTime) > 0)
      .slice(0, 4);
  }

  calculateArrivalTime(expectedArrivalTime: string): string {
    if (!expectedArrivalTime) {
      return '--';
    }

    const differenceInMinutes = this.getMinutesRemaining(expectedArrivalTime);

    return differenceInMinutes < 0
      ? 'Already arrived'
      : `${differenceInMinutes} min`;
  }

  getMinutesRemaining(expectedArrivalTime: string): number {
    if (!expectedArrivalTime) {
      return 0;
    }

    const arrivalTime = new Date();
    const [hours, minutes] = expectedArrivalTime.split(':').map(Number);
    arrivalTime.setHours(hours);
    arrivalTime.setMinutes(minutes);

    const currentTime = new Date();
    const differenceInMinutes = Math.round((arrivalTime.getTime() - currentTime.getTime()) / (1000 * 60));

    return differenceInMinutes;
  }
}
