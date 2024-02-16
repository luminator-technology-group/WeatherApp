
import { Component, OnInit } from '@angular/core';

import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  template: `
  <div class="weather-container">
  <app-weather-temperature [weatherTemperature] = "weatherTemperature"></app-weather-temperature>
  <app-weather-icon [weatherIconValue]="weatherIconValue"></app-weather-icon>
  <app-weather-wind [weatherWind]= "weatherWind"></app-weather-wind>
</div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
  title = 'WeatherApp';

  weatherData: any;
  weatherWind: number = 0;
  weatherTemperature:number = 0;
  weatherIconValue: number = 0;
  randomLatitude: number = 0;
  randomLongitude: number = 0;


  constructor(private apiService: ApiService) {}

  ngOnInit(){
    this.getWeather();
  }

  getWeather(): void {
    this.apiService.getWeather()
      .subscribe(data => {
        this.weatherData = data;
        console.log(this.weatherData);
  
        this.weatherTemperature = this.weatherData.temp;
        this.weatherWind = this.weatherData.winSpd;
        if (this.weatherData && this.weatherData.wsymb) {
          this.weatherIconValue = this.weatherData.wsymb;
        }
      });
  }
  

}
