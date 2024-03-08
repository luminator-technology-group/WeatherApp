import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stop-list',
  template: `
    <div>
      <div *ngFor="let stop of stops">
        <p>{{ stop.name }}, TIME: {{ stop.arrivalTime }} min</p>
      </div>
      <p *ngIf="!stops || stops.length === 0">Not found</p>
    </div>
  `,
  styleUrls: ['./stop-list.component.scss'],
})
export class StoplistComponent {
  @Input() stops: any[] = [];
 // @Input() arrivalTimes: string[] = [];

}
