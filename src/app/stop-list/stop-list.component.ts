import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stop-list',
  template: `
    <div class="stop-list-container">
      <div class="stop-list-item" *ngFor="let stop of stops">
        <div class="stop-name">
          <div class="circle"></div>
          <p>{{ stop.name }}</p>
        </div>
        <div class="arrival-time">
          <p>{{ calculateArrivalTime(stop.expectedArrivalTime) }}</p>
        </div>
        <div class="weather-info">
          <app-weather-temperature
            [weatherTemperature]="weatherTemperature"
          ></app-weather-temperature>
          <app-weather-icon
            [weatherIconValue]="weatherIconValue"
          ></app-weather-icon>
          <app-weather-wind [weatherWind]="weatherWind"></app-weather-wind>
        </div>

        <div>
          <p *ngIf="!stops || stops.length === 0">Not found</p>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./stop-list.component.scss'],
})
export class StoplistComponent {
  @Input() stops: any[] = [];
  @Input() weatherIconValue: number = 0;
  @Input() weatherData: any;
  @Input() weatherWind: number = 0;
  @Input() weatherTemperature: number = 0;
  

  calculateArrivalTime(expectedArrivalTime: string): string {
    if (!expectedArrivalTime) {
      return '--';
    }

    const arrivalTime = new Date();
    const [hours, minutes] = expectedArrivalTime.split(':').map(Number);
    arrivalTime.setHours(hours);
    arrivalTime.setMinutes(minutes);

    const currentTime = new Date();
    const differenceInMinutes = Math.round(
      (arrivalTime.getTime() - currentTime.getTime()) / (1000 * 60),
    );

    return differenceInMinutes < 0
      ? 'Already arrived'
      : `${differenceInMinutes} min`;
  }
  
}
