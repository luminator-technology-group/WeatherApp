import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-final-destination',
  template: `<div>
  <p>{{ finalDestinationName | titlecase }}</p>
  <ng-container *ngIf="weatherForecast && weatherForecast.length > 0">
    <h3>Weather Forecast</h3>
    <ul>
      <li *ngFor="let forecast of weatherForecast">
        {{ forecast.responseList.time | date: 'shortDate' }}: Max Temp: {{ forecast.responseList.maxTemp }}°C, Min Temp: {{ forecast.responseList.minTemp }}°C, Wind Speed: {{ forecast.responseList.winSpd }} m/s
      </li>
    </ul>
  </ng-container>
</div>`,
  styleUrls: ['./final-destination.component.scss'],
})
export class FinalDestinationComponent {
  @Input() finalDestinationName = '';
  @Input() weatherForecast: any[] = [];
}
