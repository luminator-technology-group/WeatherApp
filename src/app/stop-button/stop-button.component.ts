import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stop-button',
  template: `<div *ngIf="stopPressed" class="stop">Stop</div>`,
  styleUrls: ['./stop-button.component.scss'],
})
export class StopButtonComponent {
  @Input() stopPressed: boolean = false;
}
