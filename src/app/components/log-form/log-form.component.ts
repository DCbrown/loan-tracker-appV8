import { Component, OnInit } from '@angular/core';

import { LoanService } from '../../services/loan.service';

import { Log } from '../../models/Logs';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.scss']
})
export class LogFormComponent implements OnInit {
  id: string;
  name: string;
  owed: number;
  date: any;

  isNew = true;

  constructor(private logService: LoanService) { }

  ngOnInit() {
    // Subscribe to the selectedLog observable
    this.logService.selectedLog.subscribe(log => {
      if(log.id !== null) {
        this.isNew = false;
        this.id = log.id;
        this.name = log.name;
        this.date = log.date;
        this.owed = log.owed;
      }
    });
  }

  onSubmit() {
    // Check if new log
    if(this.isNew) {
      // Create a new log
      const newLog = {
        id: this.generateId(),
        name: this.name,
        owed: this.owed,
        date: new Date()
      }
      // Add log
      this.logService.addLog(newLog);
    } else {
      // Create log to be updated
      const updLog = {
        id: this.id,
        name: this.name,
        owed: this.owed,
        date: new Date()
      }
      // Update log
      this.logService.updateLog(updLog);
    }

    // Clear state
    this.clearState();
  }

  clearState() {
    this.isNew = true;
    this.id = '';
    this.name = '';
    this.date = '';
    this.owed = null;
    this.logService.clearState();
  }

  generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
