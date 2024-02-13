import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-weather-temperature',
  template: '<p> Temperature: {{weatherTemperature}}</p>',
  styleUrls: ['./weather-temperature.component.scss']
})
export class WeatherTemperatureComponent {
  @Input()  weatherTemperature: number = 0;


}
