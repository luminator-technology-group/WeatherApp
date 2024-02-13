import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-weather-wind',
  template: '<p> Wind : {{weatherWind}} </p>',
  styleUrls: ['./weather-wind.component.scss']
})
export class WeatherWindComponent {
@Input() weatherWind: number = 0

}
