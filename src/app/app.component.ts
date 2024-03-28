import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { environment } from 'src/environments/environment';
import { StopListService } from '../service/stop-list.service';
import { WeatherCoordinates } from './app.model';
import { StopButtonService } from '../service/stop-button.service';
import { LocationService } from '../service/location.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <div class="top-container">
      <app-final-destination
        class="final-destination"
        [finalDestinationName]="finalDestinationName"
      ></app-final-destination>
      <app-stop-button [stopPressed]="stopPressed"></app-stop-button>
      <app-current-time class="current-time"></app-current-time>
    </div>
    <app-stop-list
      [stops]="stops"
      [weatherData]="weatherDataArray"
    ></app-stop-list>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'WeatherApp';
  weatherData: any;
  weatherWind = 0;
  weatherTemperature = 0;
  weatherIconValue = 0;
  state: any;
  stops: any[] = []; // Array to store stop data
  latitude = 0;
  longitude = 0;
  mqttConfig = environment.mqtt;
  coordinates: { latitude: number; longitude: number }[] = [];
  finalDestinationName = '';
  weatherCoordinates!: WeatherCoordinates;
  cityName = '';
  stopPressed: boolean = false;
  private handleStopListCounter = 0;
  private previousStopList: any[] = [];
  weatherDataArray: any[] = [];

  constructor(
    private apiService: ApiService,
    private stopListService: StopListService,
    private stopButtonService: StopButtonService,
    private locationService: LocationService,
  ) {}

  //stop buton
  handleButtonStop() {
    this.stopButtonService.notifyButtonClick();
  }
  handleButtonStopClear() {
    this.stopButtonService.notifyClearButtonClick();
  }

  ngOnInit(): void {
    this.initConnection();
    this.fetchWeatherByCityName(this.cityName);
  }

  fetchWeatherByCityName(cityName: string): void {
    this.apiService
      .getWeatherCityName(cityName)
      .pipe(filter((data) => data !== undefined))
      .subscribe({
        next: (data) => {
          this.weatherDataArray.push(data);
          console.log('API weather:', data);
        },
        error(err) {
          console.error('Something wrong occurred: ' + err);
        },
      });
  }

  // connectet libpis with mqtt broker
  initConnection() {
    window.luminator.pis.init(this.mqttConfig);

    window.luminator.pis.client.updates().subscribe({
      next: (state: any) => {
        if (state) {
          // console.log('state stop button ', state);
          this.handleButtonStopTopic(state);
        }
        if (state && state.stopList) {
          // console.log('state is ', state);
          this.handleStopListData(state);
          this.handleButtonStopTopic(state);
          this.handleLocation(state);
        } else {
          console.log('Waiting for data...');
        }
      },
      error: (error: any) => {
        console.error('Error occurred while fetching data:', error);
      },
    });
  }

  handleButtonStopTopic(state: any): void {
    if (state.stopPressed === true) {
      this.stopPressed = true;
      this.handleButtonStop();
    }
    // clear the stop sign
    if (state.stopPressed === false) {
      this.stopPressed = false;
      this.handleButtonStopClear();
    }
  }

  // Check if the stop names are the same
  areStopsSame(stopList: any[]): boolean {
    if (stopList.length !== this.previousStopList.length) {
      return false;
    }
    for (let i = 0; i < stopList.length; i++) {
      if (stopList[i].name !== this.previousStopList[i].name) {
        return false;
      }
    }
    return true;
  }

  // get location
  handleLocation(state: any): void {
    if (state.stopList && state.stopList.length > 0) {
      const areStopsSame = this.areStopsSame(state.stopList);
      if (areStopsSame) {
        console.log('data is same ');
        return;
      }
      // If the data is different, update the previous stop list
      this.previousStopList = state.stopList;
      // Process the location data (city name)
      const locations = this.locationService.processLocation(state.stopList);
      console.log('Data from  location service mqtt', locations);
      if (locations) {
        locations.forEach((location) => {
          this.fetchWeatherByCityName(location.name);
          console.log('NAME CITY', this.cityName);
        });
      } else {
        console.log('Failed to process cityNames.');
        // Set an empty array when the cityNames could not be processed
      }
    } else {
      console.log('StopList is either undefined or empty');
    }
  }

  // get stopList
  handleStopListData(state: any): void {
    if (state.stopList.length === this.stops.length) {
      this.handleStopListCounter++;
      if (this.handleStopListCounter >= 2 && this.handleStopListCounter <= 5) {
        if (this.handleStopListCounter == 5) {
          this.handleStopListCounter = 0;
        }
        return;
      }
    }
    const parsedStopList = this.parseStopList(state.stopList);
    this.stops = parsedStopList;
    console.log('handleStopListData ', this.stops);
    this.stopListService.updateStops(parsedStopList);
    // get final destination name
    this.finalDestinationName = state.finalDestinationName;
    const retrievedStops = this.stopListService.getStops();
    console.log('Retrieved stops:', retrievedStops);
  }

  parseStopList(stopList: any): any[] {
    return stopList; // By default, it returns the unprocessed stop list
  }
}
