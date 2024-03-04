import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { WindowWithPIS } from '@msetsuite/libpis/main';
import { LuminatorWindow } from './app.model';
import { CoordinatesService } from './coordinates.service';


@Component({
  selector: 'app-root',
  template: `
    <div class="weather-container">
      <app-weather-temperature [weatherTemperature]="weatherTemperature"></app-weather-temperature>
      <app-weather-icon [weatherIconValue]="weatherIconValue"></app-weather-icon>
      <app-weather-wind [weatherWind]="weatherWind"></app-weather-wind>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'WeatherApp';
  weatherData: any;
  weatherWind = 0;
  weatherTemperature = 0;
  weatherIconValue = 0;
  randomLatitude = 0;
  randomLongitude = 0;
  state: any;

  mqttConfig = environment.mqtt;

  constructor(
    private apiService: ApiService,
    private coordinatesService : CoordinatesService
    ) {}

  ngOnInit(): void {
    this.initConnection();
    this.getWeather();

  }

  getWeather(): void {
    this.apiService.getWeather().subscribe(data => {
      this.weatherData = data;
      this.weatherTemperature = this.weatherData.temp;
      this.weatherWind = this.weatherData.winSpd;
      if (this.weatherData && this.weatherData.wsymb) {
        this.weatherIconValue = this.weatherData.wsymb;
      }
    });
  }

   // connectet libpis with mqtt broker - Please check if this connection is okay I'm not sure about this code.
   initConnection(): void {
    (window as Window as LuminatorWindow).luminator.pis.init(
      this.mqttConfig,
    );
  
    (window as Window as LuminatorWindow).luminator.pis.client
      .updates()
      .subscribe({
        next: (state: any) => {
          console.log('LIBPIS DATA', state.stopList);
          this.handleCoordinates(state);
        },
        error: (error: any) => {
          console.error('Error occurred while fetching data:', error);
        }
      });
    }
 
 
 
 
  handleCoordinates(state: any): void {
    if (state.stopList && state.stopList.length > 0) {
      console.log('Stop:', state);
      
 // Geographical data processing
      const latitude = state.stopList[0].latitude;
      const longitude = state.stopList[0].longitude;
      console.log('Latitude:', latitude);
      console.log('Longitude:', longitude);
    } else {
      console.log('StopList is either undefined or empty');
    }
  }
}

