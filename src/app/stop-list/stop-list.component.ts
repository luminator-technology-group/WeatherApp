import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stop-list',
  template: `
    <div class="stop-list-container">
      <div class="stop-list-item"*ngFor="let stop of stops | slice:0:4 " >
      <div class="circle" ></div> <p>{{ stop.name }}</p>
      </div>
      <p *ngIf="!stops || stops.length === 0">Not found</p>
    </div>
  `,
  styleUrls: ['./stop-list.component.scss'],
})
export class StoplistComponent {
  @Input() stops: any[] = [];
}
