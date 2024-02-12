//-----------API without lon and lat in url


// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class ApiService {

//   private apiUrl = 'https://9f55a98d-9acb-483c-a248-f2abef55797f.mock.pstmn.io';

//   constructor(private http: HttpClient) { }

//   getWeather(): Observable<any> {
//     const url = `${this.apiUrl}/weather`;
//     return this.http.get(url);
//   }
// }



//-----------API with lon and lat in url


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://9f55a98d-9acb-483c-a248-f2abef55797f.mock.pstmn.io';

  constructor(private http: HttpClient) { }

  getWeather(randomLatitude: number, randomLongitude: number): Observable<any> {
    const url = `${this.apiUrl}/weather?lat=${randomLatitude}&lng=${randomLongitude}`;
    return this.http.get(url);
  }
}
