import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { WindowWithPIS } from '@msetsuite/libpis/main';
import { LuminatorWindow } from './app.model';

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

  constructor(private apiService: ApiService) {}

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

  initConnection() {
    console.log("MQTT broker config ", this.mqttConfig);
    console.log('(window as Window as WindowWithPIS).luminator : ', (window as Window as WindowWithPIS).luminator);
    (window as Window as WindowWithPIS).luminator.pis.init({
      externalConfig: this.mqttConfig || undefined,
      displayId: '1', 
      decrementCallSequenceOnArrival: true, 
      preview: false 
    });

    console.log("Broker ip " + this.mqttConfig.hostname);
    
    (window as Window as WindowWithPIS).luminator.pis.client.updates().subscribe({
      next: (state: any) => {
        console.log('LIBPIS DATA', state);
        
      }
    });
  }
}

