import { Component, OnInit } from '@angular/core';

import { LoanService } from '../../services/loan.service';

import { Log } from '../../models/Logs';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  logs: Log[];
  selectedLog: Log;
  loaded = false;
  data: any;
  logSum: number;

  constructor(private logService: LoanService) { }

  ngOnInit() {
    this.logService.stateClear.subscribe(clear => {
      if(clear) {
        this.selectedLog = {id: '', name: '', owed: 0, date: ''};
      }
    });

    this.logService.getLogs().subscribe(logs => {
      this.logs = logs;
      this.loaded = true;
    });
  }

  getSum() {
    let sum = 0;
    for (let i = 0; i < this.logs.length; i++) {
      sum += this.logs[i].owed;
    }
    this.logSum = sum;
  }

  onSelect(log: Log) {
    this.logService.setFormLog(log);
    this.selectedLog = log;
  }

  onDelete(log: Log) {
    if(confirm('Are you sure?')){
      this.logService.deleteLog(log);
    }
  }

}
