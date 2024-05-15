import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-current-time',
  template: ` <p>{{ currentDate | date: 'HH:mm' }}</p> `,
  styleUrls: ['./current-time.component.scss'],
})
export class CurrentTimeComponent implements OnInit {
  currentDate = new Date();

  ngOnInit(): void {
    timer(0, 1000).subscribe(() => {
      this.currentDate = new Date();
    });
  }
}
