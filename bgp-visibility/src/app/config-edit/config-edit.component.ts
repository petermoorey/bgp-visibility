import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-config-edit',
  templateUrl: './config-edit.component.html',
  styleUrls: ['./config-edit.component.css']
})
export class ConfigEditComponent implements OnInit {
  @Output() eventCreated = new EventEmitter<object>();
  prefixList = [];
  prefix = '';
  username = 'pmoorey';

  constructor(public dataService: DatabaseService) { }

  ngOnInit(): void {
  }

  onClickAddPrefix() {
    this.prefixList.push(this.prefix);

    const notification = {
      message: 'Added ' + this.prefix,
      severity: 'info',
      username: this.username,
      seen: false
    };

    this.eventCreated.emit(notification);
    // create prefix
    const data = {
      prefix: this.prefix,
      username: this.username
    };
    this.dataService.createMonitoredPrefixes(data);
  }
}
