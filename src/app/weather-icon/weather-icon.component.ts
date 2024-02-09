
import { Component, OnInit } from '@angular/core';
import { IconService } from '../icon.service';

@Component({
  selector: 'app-weather-icon',
  templateUrl: './weather-icon.component.html',
  styleUrls: ['./weather-icon.component.scss']
})
export class WeatherIconComponent implements OnInit {
  weatherData: any;
  weatherIconValue: number | undefined;

  constructor(private iconService: IconService) { }

  ngOnInit(): void {
    this.iconService.getIconData(16.158, 58.5812).subscribe((data: any) => {
      this.weatherData = data;
      this.setWeatherIconValue();
    });
  }

  setWeatherIconValue(): void {
    if (this.weatherData && this.weatherData.timeSeries && this.weatherData.timeSeries.length > 0) {
      const wsymb2Value = this.weatherData.timeSeries[0].parameters.find((param: { name: string }) => param.name === 'Wsymb2').values[0];
      this.weatherIconValue = wsymb2Value;
    }
  }
  

  getWeatherIconUrl(symbolValue: number): string {
    switch (symbolValue) {
            case 1: return "Clear sky";
            case 2: return "Nearly clear sky";
            case 3: return "Variable cloudiness";
            case 4: return "Halfclear sky";
            case 5: return "Cloudy sky";
            case 6: return "Overcast";
            case 7: return "Fog";
            case 8: return "Light rain showers";
            case 9: return "Moderate rain showers";
            case 10: return "Heavy rain showers";
            case 11: return "Thunderstorm";
            case 12: return "Light sleet showers";
            case 13: return "Moderate sleet showers";
            case 14: return "Heavy sleet showers";
            case 15: return "Light snow showers";
            case 16: return "Moderate snow showers";
            case 17: return "Heavy snow showers";
            case 18: return "Light rain";
            case 19: return "Moderate rain";
            case 20: return "Heavy rain";
            case 21: return "Thunder";
            case 22: return "Light sleet";
            case 23: return "Moderate sleet";
            case 24: return "Heavy sleet";
            case 25: return "Light snowfall";
            case 26: return "Moderate snowfall";
            case 27: return "Heavy snowfall";
            default: return "No data";
          }
          
  }
}
