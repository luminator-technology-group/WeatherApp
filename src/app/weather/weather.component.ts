// import { Component, OnInit } from '@angular/core';
// import { ApiService } from '../api.service';

// @Component({
//   selector: 'app-weather',
//   templateUrl: './weather.component.html',
//   styleUrls: ['./weather.component.scss']
// })
// export class WeatherComponent implements OnInit {
//   city = 'Stockholm';
//   weatherData: any;

//   constructor(private apiService: ApiService) { }

//   ngOnInit(): void {
//     this.getWeather();
//   }

//   getWeather(): void {
//     this.apiService.getWeather(this.city)
//       .subscribe(
//         data => {
//           console.log('Received weather data:', data); // Wyświetl otrzymane dane przed ich przetworzeniem
//           this.weatherData = data;
//         },
//         error => {
//           console.error('Error fetching weather data:', error); // Wyświetl błąd, jeśli wystąpił
//         }
//       );
//   }
// }


import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  weatherData: any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getWeather();
  }

  getWeather(): void {
    const randomLatitude = this.generateRandomLatitude();
    const randomLongitude = this.generateRandomLongitude();

    this.apiService.getWeather(randomLatitude, randomLongitude)
      .subscribe(data => {
        this.weatherData = data;
        console.log(this.weatherData);
      });
  }

  private generateRandomLatitude(): number {
    // Logika generowania losowej szerokości geograficznej
    return Math.random() * (90 - (-90)) + (-90);
  }

  private generateRandomLongitude(): number {
    // Logika generowania losowej długości geograficznej
    return Math.random() * (180 - (-180)) + (-180);
  }
}
