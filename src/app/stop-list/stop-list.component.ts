import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stop-list',
  template: `
    <div>
      <div *ngFor="let stop of stops">
        <p>Stop name: {{ stop.name }}</p>
        <p *ngIf="stop.currentStopName">
          Current stop name: {{ stop.currentStopName }}
        </p>
      </div>
      <p *ngIf="!stops || stops.length === 0">Not found</p>
    </div>
  `,
  styleUrls: ['./stop-list.component.scss'],
})
export class StoplistComponent {
  @Input() stops: any[] = [];
}
