import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  template: `
    <div>
  <app-weather-temperature [weatherTemperature] = "weatherTemperature"></app-weather-temperature>
</div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'WeatherApp';
  weatherData :any;
  randomLatitude: number = 0;
  randomLongitude: number = 0;
  weatherTemperature:number = 0;


  constructor(private apiService: ApiService) {}

  ngOnInit(){
    this.getWeather();
  }

  getWeather(): void {
    this.apiService.getWeather(0,0)
    .subscribe(data =>{
      this.weatherData = data;
      this.weatherTemperature = this.weatherData.temp;
    })
  }
}


