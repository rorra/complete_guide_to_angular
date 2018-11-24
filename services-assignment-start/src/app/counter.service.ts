import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  inactive_count = 0;
  active_count = 0;

  constructor() {
  }

  increment_inactive() {
    this.inactive_count++;
  }

  increment_active() {
    this.active_count++;
  }
}
