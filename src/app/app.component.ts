import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  template: `
    <div>
  <app-weather-temperature [weatherTemperature] = "weatherTemperature"></app-weather-temperature>
  <app-weather-icon [weatherIconValue]="weatherIconValue"></app-weather-icon>
</div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'WeatherApp';
  weatherData :any;
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
        if (this.weatherData && this.weatherData.wsymb) {
          this.weatherIconValue = this.weatherData.wsymb;
        }
      });
  }
}
