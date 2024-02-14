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
  weatherTemperature:number = 0;


  constructor(private apiService: ApiService) {}

  ngOnInit(){
    this.getWeather();
  }

  getWeather(): void {
    this.apiService.getWeather()
    .subscribe(data =>{
      this.weatherData = data;
      console.log(this.weatherData)
      this.weatherTemperature = this.weatherData.temp;
    })
  }
}


