//witout lon and lat 


// import { Component, OnInit } from '@angular/core';
// import { ApiService } from '../api.service';

// @Component({
//   selector: 'app-weather',
//   templateUrl: './weather.component.html',
//   styleUrls: ['./weather.component.scss']
// })
// export class WeatherComponent implements OnInit {
//   weatherData: any;

//   constructor(private apiService: ApiService) { }

//   ngOnInit(): void {
//     this.getWeather();
//   }

//   getWeather(): void {
//     this.apiService.getWeather()
//       .subscribe(data => {
//         this.weatherData = data;
//         console.log(this.weatherData);
//       });
//   }
// }


//-------------------------------- with lon and lat 

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  weatherData: any;
  randomLatitude: number = 0; 
  randomLongitude: number = 0; 

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.generateRandomCoordinates();
    this.getWeather();
  }

  getWeather(): void {
    this.apiService.getWeather(this.randomLatitude, this.randomLongitude)
      .subscribe(data => {
        this.weatherData = data;
        console.log(this.weatherData);
      });
  }

  private generateRandomCoordinates(): void {

    this.randomLatitude = Math.random() * (90 - (-90)) + (-90);
    this.randomLongitude = Math.random() * (180 - (-180)) + (-180);
  }
}
