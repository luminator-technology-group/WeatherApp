import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-weather-icon',
  templateUrl: './weather-icon.component.html',
  styleUrls: ['./weather-icon.component.scss']
})
export class WeatherIconComponent implements OnInit {
  weatherData: any;
  weatherIconValue: any;
  randomLatitude: number = 0; 
  randomLongitude: number = 0; 

  constructor(private apiService: ApiService) { }

 
  ngOnInit(): void {
    this.generateRandomCoordinates();
    this.getWeather();
  }

  getWeather(): void {
    this.apiService.getWeather(this.randomLatitude, this.randomLongitude)
      .subscribe(data => {
        this.weatherData = data;
        console.log(this.weatherData);
        if (this.weatherData && this.weatherData.wsymb) {
          this.weatherIconValue = this.weatherData;
        }
      });
    }

  private generateRandomCoordinates(): void {
    // Generating random geographical coordinates
    this.randomLatitude = Math.random() * 180 - 90;
    this.randomLongitude = Math.random() * 360 - 180;
   
  }

  getWeatherIconUrl(symbolValue: number): string {
    switch (symbolValue) {
      case 1: return 'assets/1.png'; // Clear sky
      case 2: return 'assets/2.png'; // Nearly clear sky
      case 3: return 'assets/3.png'; // Variable cloudiness
      case 4: return 'assets/4.png'; // Halfclear sky
      case 5: return 'assets/5.png'; // Cloudy sky
      case 6: return 'assets/6.png'; // Overcast
      case 7: return 'assets/7.png'; // Fog
      case 8: return 'assets/8.png'; // Light rain showers
      case 9: return 'assets/9.png'; // Moderate rain showers
      case 10: return 'assets/10.png'; // Heavy rain showers
      case 11: return 'assets/11.png'; // Thunderstorm
      case 12: return 'assets/12.png'; // Light sleet showers
      case 13: return 'assets/13.png'; // Moderate sleet showers
      case 14: return 'assets/14.png'; // Heavy sleet showers
      case 15: return 'assets/15.png'; // Light snow showers
      case 16: return 'assets/16.png'; // Moderate snow showers
      case 17: return 'assets/17.png'; // Heavy snow showers
      case 18: return 'assets/18.png'; // Light rain
      case 19: return 'assets/19.png'; // Moderate rain
      case 20: return 'assets/20.png'; // Heavy rain
      case 21: return 'assets/21.png'; // Thunder
      case 22: return 'assets/22.png'; // Light sleet
      case 23: return 'assets/23.png'; // Moderate sleet
      case 24: return 'assets/24.png'; // Heavy sleet
      case 25: return 'assets/25.png'; // Light snowfall
      case 26: return 'assets/26.png'; // Moderate snowfall
      case 27: return 'assets/27.png'; // Heavy snowfall
      default: return ''; 
    }
  }
}
