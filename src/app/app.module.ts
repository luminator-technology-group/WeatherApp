import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherWindComponent } from './weather-wind/weather-wind.component';
import { WeatherTemperatureComponent } from './weather-temperature/weather-temperature.component';
import { WeatherIconComponent } from './weather-icon/weather-icon.component';
import { StoplistComponent } from './stop-list/stop-list.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherWindComponent,
    WeatherTemperatureComponent,
    WeatherIconComponent,
    StoplistComponent,
  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
