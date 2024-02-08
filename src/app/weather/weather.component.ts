import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  city = 'Stockholm';
  weatherData: any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getWeather();
  }

  getWeather(): void {
    this.apiService.getWeather(this.city)
      .subscribe(data => {
        this.weatherData = data;
        console.log(this.weatherData);
      });
  }
}
