import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-weather-wind',
  template: `
  <div class="wind-container">
    <img class="wind-icon" src="/assets/wind.svg" alt="wind" />
    <p> {{weatherWind | number : "1.0-0"}} m/s </p>
  </div>`,
  styleUrls: ['./weather-wind.component.scss']
})
export class WeatherWindComponent {
@Input() weatherWind: number = 0

}
