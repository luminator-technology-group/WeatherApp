import { Component, OnInit } from '@angular/core';
//import { Connection, InitParams, WindowWithPIS, LuminatorWindow } from '@msetsuite/libpis';
import { LuminatorWindow } from './app.model';
import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-root',
  template: `
  <div class="weather-container">
  <app-weather-temperature [weatherTemperature] = "weatherTemperature"></app-weather-temperature>
  <app-weather-icon [weatherIconValue]="weatherIconValue"></app-weather-icon>
  <app-weather-wind [weatherWind]= "weatherWind"></app-weather-wind>
</div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
  title = 'WeatherApp';


  weatherData: any;
  weatherWind = 0;
  weatherTemperature = 0;
  weatherIconValue = 0;
  randomLatitude = 0;
  randomLongitude = 0;
  state:any;
 
  mqttConfig = environment.mqtt;


  constructor(private apiService: ApiService) {}

  ngOnInit(){
    //this.getWeather();
    this.initConnection();
  }

  getWeather(): void {
    this.apiService.getWeather()
      .subscribe(data => {
        this.weatherData = data;
        ///* eslint-disable */console.log(...oo_oo(`2758525345_38_8_38_37_4`,this.weatherData));
  
        this.weatherTemperature = this.weatherData.temp;
        this.weatherWind = this.weatherData.winSpd;
        if (this.weatherData && this.weatherData.wsymb) {
          this.weatherIconValue = this.weatherData.wsymb;
        }
      });
  }

  //conection libPIS 

  
  
 initConnection() {
  //windowWithPIS: WindowWithPIS<any>;
  //let windowWithPIS = new WindowWithPIS() ;

  console.log("MQTT broker config "+ this.mqttConfig);
  //let initParam: InitParams;
  //initParam.externalConfig = this.mqttConfig;
  //windowWithPIS.luminator.pis.init({ displayId: '1', externalConfig: this.mqttConfig});
  /* luminator.pis.client.updates().subscribe({
  
  }) */

  console.log('(window as Window as LuminatorWindow).luminator', (window as Window as LuminatorWindow).luminator);

  (window as Window as LuminatorWindow).luminator.pis.init({
    externalConfig: this.mqttConfig || undefined,
    displayId: '1',//this.displayId ? this.displayId : this.config?.DISPLAY_ID,
    decrementCallSequenceOnArrival: undefined,//this.config?.DECREMENTAL_CALL_SEQUENCE_ON_ARRIVAL || true,
    preview: undefined//this.preview === 'true',
  });

  console.log("Broker ip " + this.mqttConfig.hostname); 
  
}


}
