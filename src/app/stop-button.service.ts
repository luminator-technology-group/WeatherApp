import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StopButtonService {

  private stopButtonService = new Subject<void>();
  private mqttClient: any; 
  
  setMqttClient(client: any) {
    this.mqttClient = client;
  }
  isStopButtonVisible = false; 

  buttonClick = this.stopButtonService.asObservable();

  notifyButtonClick() {
    this.isStopButtonVisible = true; 
    this.stopButtonService.next();
    this.sendStopSignal();
  }

  private sendStopSignal() {
    if (window.luminator.pis.client && typeof window.luminator.pis.client.publish === 'function') {
      window.luminator.pis.client.publish('pis/0/sensors/stop_button', JSON.stringify({ stopPressed: true }));
    } else {
      console.error('MQTT client or publish function is not available.');
    }
  }
  
}
