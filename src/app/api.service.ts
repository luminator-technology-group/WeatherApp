
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 import { environment } from '../environments/environment'; 


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = environment.apiBasePath;


  constructor(private http: HttpClient) { }

  getWeather(): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.get(url);
  }

  getWeatherCoordinates(latitude: number, longitude: number): Observable<any> {
    const url = `${this.apiUrl}/position?lon=${longitude}&lat=${latitude}`;
    return this.http.get(url);
  }
  
}

// http://localhost:8080/dynamic-weather/api/weather/position?lon=14.1234&lat=58.1234