import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stop-list',
  template: `
    <div class="stop-list-container">
      <div class="stop-list-item"*ngFor="let stop of stops | slice:0:4 " >
      <div class="circle" ></div> <p>{{ stop.name }}</p>
    <div>
      <div *ngFor="let stop of stops">
        <p>
          {{ stop.name }}. Arrival Time :
          {{ calculateArrivalTime(stop.expectedArrivalTime) }}
        </p>
      </div>
      <p *ngIf="!stops || stops.length === 0">Not found</p>
    </div>
  `,
  styleUrls: ['./stop-list.component.scss'],
})
export class StoplistComponent {
  @Input() stops: any[] = [];

  calculateArrivalTime(expectedArrivalTime: string): string {
    if (!expectedArrivalTime) {
      return '--';
    }

    const arrivalTime = new Date();
    const [hours, minutes] = expectedArrivalTime.split(':').map(Number);
    arrivalTime.setHours(hours);
    arrivalTime.setMinutes(minutes);

    const currentTime = new Date();
    const differenceInMinutes = Math.round(
      (arrivalTime.getTime() - currentTime.getTime()) / (1000 * 60),
    );

    return differenceInMinutes < 0
      ? 'Already arrived'
      : `${differenceInMinutes} min`;
  }
}
