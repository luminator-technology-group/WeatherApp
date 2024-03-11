import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-final-destination',
  template: `<p>{{ finalDestinationName | titlecase }}</p>`,
  styleUrls: ['./final-destination.component.scss']
})
export class FinalDestinationComponent {
  @Input () finalDestinationName = '';

}
