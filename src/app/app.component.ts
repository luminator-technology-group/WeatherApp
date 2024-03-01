import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { WindowWithPIS } from '@msetsuite/libpis/main';
import { LuminatorWindow } from './app.model';
import { StopListService } from './stop-list.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="weather-container">
      <app-weather-temperature
        [weatherTemperature]="weatherTemperature"
      ></app-weather-temperature>
      <app-weather-icon
        [weatherIconValue]="weatherIconValue"
      ></app-weather-icon>
      <app-weather-wind [weatherWind]="weatherWind"></app-weather-wind>
    </div>
    <app-stop-list [stops]="stops"></app-stop-list>
  `,
  styleUrls: ['./app.component.scss'],
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
  stops: any[] = []; // Array to store stop data

  mqttConfig = environment.mqtt;

  constructor(
    private apiService: ApiService,
    private stopListService: StopListService,
  ) {}

  ngOnInit(): void {
    this.initConnection();
    this.getWeather();
  }

  getWeather(): void {
    this.apiService.getWeather().subscribe((data) => {
      this.weatherData = data;
      this.weatherTemperature = this.weatherData.temp;
      this.weatherWind = this.weatherData.winSpd;
      if (this.weatherData && this.weatherData.wsymb) {
        this.weatherIconValue = this.weatherData.wsymb;
      }
    });
  }

  // connectet libpis with mqtt broker - Please check if this connection is okay I'm not sure about this code.
  initConnection() {
    (window as Window as LuminatorWindow).luminator.pis.init(
      this.mqttConfig,
    );

    (window as Window as LuminatorWindow).luminator.pis.client
      .updates()
      .subscribe({
        next: (state: any) => {
          console.log('LIBPIS DATA', state);
          this.handleStopListData(state);
        },
      });
  }

  // get stopList

  handleStopListData(state: any): void {
    const parsedStopList = this.parseStopList(state.stopList);
    console.log('Parsed stop list:', parsedStopList);

    // Update stop list
    this.stops = parsedStopList;
    this.stopListService.updateStops(parsedStopList);
  }

  parseStopList(stopList: any): any[] {
    return stopList; // By default, it returns the unprocessed stop list
  }
}
