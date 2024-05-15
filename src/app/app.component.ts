import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { environment } from 'src/environments/environment';
import { StopListService } from '../service/stop-list.service';
import {
  Coordinates,
  StopData,
  WeatherCoordinates,
  WeatherData,
  WeatherForecast,
} from './app.model';
import { CoordinatesService } from '../service/coordinates.service';
import { StopButtonService } from '../service/stop-button.service';
import { LocationService } from '../service/location.service';
import { filter } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  template: `
    <div class="top-container">
      <app-final-destination
        class="final-destination"
        [finalDestinationName]="finalDestinationName"
        [weatherForecast]="weatherForecast"
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
  weatherData: WeatherData[] = [];
  weatherWind = 0;
  weatherTemperature = 0;
  weatherIconValue = 0;
  state: any;
  stops: StopData[] = [];
  latitude = 0;
  longitude = 0;
  mqttConfig = environment.mqtt;
  coordinates: Coordinates[] = [];
  finalDestinationName = '';
  weatherCoordinates!: WeatherCoordinates;
  stopPressed = false;
  private handleStopListCounter = 0;
  private previousStopList: StopData[] = [];
  weatherDataArray: WeatherData[] = [];
  cityName = '';
  weatherLookupType!: string;
  days = 5;
  weatherForecast: WeatherForecast[] = [];

  constructor(
    private apiService: ApiService,
    private coordinatesService: CoordinatesService,
    private stopListService: StopListService,
    private stopButtonService: StopButtonService,
    private locationService: LocationService,
    private http: HttpClient,
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

    this.fetchForecast(this.latitude, this.longitude, this.days)

    this.fetchWeatherConfig();

    if (this.weatherLookupType === 'GPS') {
      this.fetWeatherCoordinates(this.latitude, this.longitude);
      return;
    }
    if (this.weatherLookupType === 'Location Name') {
      this.fetchWeatherByCityName(this.cityName);
    }
    
  }

  fetchWeatherConfig() {
    this.http.get<any>('assets/bundle-description.json').subscribe((data) => {
      // Assuming there's only one layout in the JSON, otherwise iterate over layouts
      //DEBUG: use options[0] or options[1] to read between gps or location
      this.weatherLookupType = data.layouts[0].parameters[0].options[0].value;
    });
  }

  fetchWeatherByCityName(cityName: string): void {
    this.apiService
      .getWeatherCityName(cityName)
      .pipe(filter((data) => data !== undefined))
      .subscribe({
        next: (data) => {
          const weatherDataWithweatherLookupType: WeatherData = {
            weatherLookupType: this.weatherLookupType,
            latitude: data.latitude,
            longitude: data.longitude,
            data: data,
          };
          this.weatherDataArray.push(weatherDataWithweatherLookupType);

        },

        error(err) {
          if (err.statusText === 'OK') return;
          console.error('Something wrong occurred: ' + err);
        },
      });
  }

  // get weather coordinats
  fetWeatherCoordinates(latitude: number, longitude: number): void {
    this.apiService
      .getWeatherCoordinates(latitude, longitude)
      .pipe(filter((data) => data !== undefined))
      .subscribe({
        next: (data) => {
          console.log(data)
          const weatherDataWithLatLong = {
            weatherLookupType: this.weatherLookupType,
            latitude: latitude,
            longitude: longitude,
            data: data,
          };
          this.weatherDataArray.push(weatherDataWithLatLong);
        },
        error(err) {
          console.error('Something wrong occurred: ' + err);
        },
      });
  }

   // New method to fetch forecast
   fetchForecast(latitude: number, longitude: number, days: number): void {
    this.apiService
      .getForecast(latitude, longitude, days) 
      .pipe(filter((data) => data !== undefined))
      .subscribe({
        next: (forecastData) => {
          console.log('Forecast Data:', forecastData);
          this.weatherForecast = forecastData.responseList;
        },
        error: (err) => {
          console.error('Error fetching forecast:', err);
        }
      });
  }



  // connectet libpis with mqtt broker
  initConnection() {
    window.luminator.pis.init(this.mqttConfig);

    window.luminator.pis.client.updates().subscribe({
      next: (state: any) => {
        console.log('State:', state);
        if (state) {
          this.handleButtonStopTopic(state);
        }
        console.log('State before if ', state);
        console.log('state.stopList before if ', state.__raw.stopList);
        if (state && state.stopList) {
          console.log('inside State before if ', state);
          console.log('inside state.stopList before if ', state.__raw.stopList);
          this.handleStopListData(state);
          if (this.weatherLookupType === 'GPS') {        
            console.log('GPS');
            this.handleCoordinates(state);
            return;
          }
          if (this.weatherLookupType === 'Location Name') {
            console.log('Location Name');
            this.handleLocation(state);
          }
          console.log('Data received:', state);
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
    if (state.stopPressed) {
      console.log('state.stopPressed is ', state.stopPressed);
      this.stopPressed = true;
      this.handleButtonStop();
    }

    //clear the stop sign
    if (!state.stopPressed) {
      console.log('state.stopPressed is ', state.stopPressed);
      this.stopPressed = false;
      this.handleButtonStopClear();
    }
  }

  // read Latitude and Longitude
  handleCoordinates(state: any): void {
    if (state.stopList && state.stopList.length > 0) {
      const areStopsSame = this.areStopsSame(state.stopList);
      if (areStopsSame) {
        return;
      }
      // If the data is different, update the previous stop list
      this.previousStopList = state.stopList;
      // Process the coordinates
      const coordinate = this.coordinatesService.processCoordinates(
        state.stopList,
      );
      if (coordinate) {
        this.coordinates = coordinate;
        this.coordinates.forEach((element) => {
          this.fetWeatherCoordinates(element.latitude, element.longitude);
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
        return;
      }
      // If the data is different, update the previous stop list
      this.previousStopList = state.stopList;
      // Process the location data (city name)
      const locations = this.locationService.processLocation(state.stopList);
      if (locations) {
        locations.forEach((location) => {
          this.fetchWeatherByCityName(location.name);
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
    this.stopListService.updateStops(parsedStopList);
    
    // Get the last stop as the final destination
    const lastStop = parsedStopList[parsedStopList.length - 1];
    this.finalDestinationName = lastStop.name;
    
    
    console.log("this.finalDestinationName", this.finalDestinationName)
    // Log the final destination name for debugging
    const lastStopCoordinates = {
      latitude: lastStop.latitude,
      longitude: lastStop.longitude
    };
  
   // Get the coordinates of the last stop
    if (this.finalDestinationName && lastStopCoordinates.latitude && lastStopCoordinates.longitude) {
      this.fetchForecast(lastStopCoordinates.latitude, lastStopCoordinates.longitude, this.days);
    }
  }
  
  parseStopList(stopList: any): any[] {
    return stopList; // By default, it returns the unprocessed stop list
  }
}
