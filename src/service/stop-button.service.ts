import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StopButtonService {
  private stopButtonService = new Subject<boolean>();
  stopPressed = false;

  notifyButtonClick() {
    console.log('notifyButtonClick');
    this.stopPressed = true;
    this.stopButtonService.next(this.stopPressed);
  }

  notifyClearButtonClick() {
    this.stopPressed = false;
    this.stopButtonService.next(this.stopPressed);
  }
}
