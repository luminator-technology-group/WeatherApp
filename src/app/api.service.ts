// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class ApiService {

//   private apiUrl = 'https://9f55a98d-9acb-483c-a248-f2abef55797f.mock.pstmn.io';

//   constructor(private http: HttpClient) { }

//   getWeather(city: string): Observable<any> {
//     // const url = `${this.apiUrl}/weather?q=${city}`;
//     const url = `${this.apiUrl}/weather?q=`;
//     // const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}`;
//     return this.http.get(url);
//   }
// }



import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://your-base-url.com'; // Zastąp 'your-base-url.com' odpowiednim adresem bazowym

  constructor(private http: HttpClient) { }

  getWeather(randomLatitude: number, randomLongitude: number): Observable<any> {
    const url = `${this.apiUrl}/weather?lat=${randomLatitude}&lng=${randomLongitude}`;
    return this.http.get(url);
  }
}



