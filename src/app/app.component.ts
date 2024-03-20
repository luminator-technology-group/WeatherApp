import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { CoordinatesService } from './coordinates.service';
import { StopListService } from './stop-list.service';
import { WeatherCoordinates } from './app.model';
import { StopButtonService } from './stop-button.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="top-container">
      <app-final-destination
        class="final-destination"
        [finalDestinationName]="finalDestinationName"
      ></app-final-destination>
       <app-stop-button *ngIf="stopPressed"></app-stop-button>
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
  weatherCoordinates!: WeatherCoordinates;

  private handleStopListCounter = 0;
  private previousStopList: any[] = [];
  stopPressed = false;

  constructor(
    private apiService: ApiService,
    private coordinatesService: CoordinatesService,
    private stopListService: StopListService,
    private stopButtonService: StopButtonService
  ) {}

  ngOnInit(): void {
    this.initConnection();
    this.getWeatherCoordinates(this.latitude, this.longitude);
    this.stopButtonService.buttonClick.subscribe(() => {
      this.stopPressed = true;
    });
  }


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

 // read the stop button
 hendleStopButton(state:any):void{
  window.luminator.pis.client.updates().subscribe('pis/0/sensors/stop_button', (message: any) => {
    const stopButtonData = JSON.parse(message.payload.toString());
    console.log('Received stop button data:', stopButtonData);
   
  });
 }

  // read Latitude and Longitude

  handleCoordinates(state: any): void {
    if (state.stopList && state.stopList.length > 0) {
      const areStopsSame = this.areStopsSame(state.stopList);
      if (areStopsSame) {
        console.log('data is same ');
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
