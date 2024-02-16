import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-weather-temperature',
  template: '<p> {{weatherTemperature | number : "1.0-0"}} °C </p>',
  styleUrls: ['./weather-temperature.component.scss']
})
export class WeatherTemperatureComponent {
  @Input()  weatherTemperature: number = 0;


}
