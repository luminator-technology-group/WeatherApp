import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StopButtonService {

  private stopButtonService = new Subject<boolean>();
  stopPressed = false; 

  buttonClick = this.stopButtonService.asObservable();

  notifyButtonClick() {
    this.stopPressed = true; 
    this.stopButtonService.next(this.stopPressed);
  }
}


