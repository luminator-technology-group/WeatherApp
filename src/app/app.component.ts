import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  template: '<app-weather-wind [weatherWind]= "weatherWind"></app-weather-wind>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
  title = 'WeatherApp';
  weatherData: any;
  weatherWind: number = 0;

  
  constructor( private apiService: ApiService) {}
  ngOnInit(): void {
    this.getWeather()
  }
  getWeather(): void{
    this.apiService.getWeather(0,0)
    .subscribe(data =>{
      this.weatherData = data;
      this.weatherWind = this.weatherData.windSpd
    })
  }



}
