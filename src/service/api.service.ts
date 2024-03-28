import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiBasePath;
  private apiUrlLocation = environment.apiBasePathLocation;

  constructor(private http: HttpClient) {}

  getWeatherCityName(cityName: string): Observable<any> {
    const urlLocation = `${this.apiUrlLocation}?cityName=${cityName}`;
    return this.http.get(urlLocation);
  }
  getWeatherCoordinates(latitude: number, longitude: number): Observable<any> {
    const url = `${this.apiUrl}?lon=${longitude}&lat=${latitude}`;
    return this.http.get(url);
  }
}
