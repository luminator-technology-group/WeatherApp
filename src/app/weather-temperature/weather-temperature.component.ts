import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-weather-temperature',
  template: '<p> {{weatherTemperature}} °C </p>',
  styleUrls: ['./weather-temperature.component.scss']
})
export class WeatherTemperatureComponent {
  @Input()  weatherTemperature = 0;


}
