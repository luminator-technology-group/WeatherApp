import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { CoordinatesService } from './coordinates.service';
import { StopListService } from './stop-list.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="top-container">
      <app-final-destination
        class="final-destination"
        [finalDestinationName]="finalDestinationName"
      ></app-final-destination>
      <app-current-time class="current-time"></app-current-time>
    </div>
    <app-stop-list
      [stops]="stops"
      [weatherIconValue]="weatherIconValue"
      [weatherData]="weatherData"
      [weatherWind]="weatherWind"
      [weatherTemperature]="weatherTemperature"
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
  weatherCoordinates: any;
  private handleCoordinatesCounter = 0; // Counter to track the number of times handleCoordinates is called
  private handleStopListCounter = 0;

  constructor(
    private apiService: ApiService,
    private coordinatesService: CoordinatesService,
    private stopListService: StopListService,
  ) {}

  ngOnInit(): void {
    this.initConnection();
    // this.getWeather();
    this.getWeatherCoordinates(this.latitude, this.longitude);
  }

  // getWeather(): void {
  //   this.apiService.getWeather().subscribe((data) => {
  //     this.weatherData = data;
  //     this.weatherTemperature = this.weatherData.temp;
  //     this.weatherWind = this.weatherData.winSpd;
  //     if (this.weatherData && this.weatherData.wsymb) {
  //       this.weatherIconValue = this.weatherData.wsymb;
  //     }
  //     console.log('Weather', data);
  //   });
  // }

  // get weather coordinats
  getWeatherCoordinates(latitude: number, longitude: number): void {
    this.apiService
      .getWeatherCoordinates(latitude, longitude)
      .subscribe((data) => {
        this.weatherCoordinates = data;
        this.weatherTemperature = this.weatherCoordinates.temp;
        this.weatherWind = this.weatherCoordinates.winSpd;
        if (this.weatherCoordinates && this.weatherCoordinates.wsymb) {
          this.weatherIconValue = this.weatherCoordinates.wsymb;
        }
        console.log('Weather', data);
      });
  }

  // connectet libpis with mqtt broker - Please check if this connection is okay I'm not sure about this code.
  initConnection() {
    window.luminator.pis.init(this.mqttConfig);

    window.luminator.pis.client.updates().subscribe({
      next: (state: any) => {
        if (state && state.stopList) {
          //console.log('List data from init:', state.stopList);
          console.log('state is ', state);

          this.handleCoordinates(state);
          this.handleStopListData(state);
        } else {
          console.log('Waiting for data...');
        }
      },
      error: (error: any) => {
        console.error('Error occurred while fetching data:', error);
      },
    });
  }

  // read Latitude and Longitude
  handleCoordinates(state: any): void {
    if (state.stopList && state.stopList.length > 0) {
      // for now we use length. but later, we should check stop name or something to return if data is same and avoid sending new weather request.
      if (state.stopList.length === this.stops.length) {
        this.handleCoordinatesCounter++;
        //console.log("this.handleCoordinatesCounter ", this.handleCoordinatesCounter);

        if (
          this.handleCoordinatesCounter >= 2 &&
          this.handleCoordinatesCounter <= 10
        ) {
          if (this.handleCoordinatesCounter == 10) {
            this.handleCoordinatesCounter = 0;
          }
          return;
        }
      }

      const coordinate = this.coordinatesService.processCoordinates(
        state.stopList,
      );
      if (coordinate) {
        this.coordinates = coordinate;
        this.coordinates.forEach((element) => {
          this.getWeatherCoordinates(element.latitude, element.longitude);
          console.log('handleCoordinates', this.coordinates);
        });
      } else {
        console.log('Failed to process coordinates.');
        this.coordinates = []; // Set an empty array when the coordinates could not be processed
      }
    } else {
      console.log('StopList is either undefined or empty');
      this.coordinates = [];
    }
  }

  // get stopList

  handleStopListData(state: any): void {
    if (state.stopList.length === this.stops.length) {
      this.handleStopListCounter++;
      console.log('this.handleStopListCounter ', this.handleStopListCounter);

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
