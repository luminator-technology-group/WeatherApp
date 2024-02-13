import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  template: ' <app-weather-icon [weatherIconValue]="weatherIconValue"></app-weather-icon>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  weatherData: any;
  randomLatitude: number = 0;
  randomLongitude: number = 0;
  weatherIconValue: number = 0;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getWeather();
  }

  getWeather(): void {
    this.apiService.getWeather(this.randomLatitude, this.randomLongitude)
      .subscribe(data => {
        this.weatherData = data;
        console.log(this.weatherData);
        if (this.weatherData && this.weatherData) {
          this.weatherIconValue = this.weatherData.wsymb;
        }
      });
    }
}
