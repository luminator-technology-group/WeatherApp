import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-lat-lng',
  template: `
    <div *ngFor="let coordinate of coordinates">
      <p> Latitude:{{ coordinate.latitude }} , Longitude: {{ coordinate.longitude }}</p>
    </div>
  `,
  styleUrls: ['./lat-lng.component.scss'],
})
export class LatLngComponent {
  @Input() coordinates: { latitude: number; longitude: number }[] = [];

}
