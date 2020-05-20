import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Notification } from '../notification.model';
import { Prefix } from '../prefix.model';

@Component({
  selector: 'app-config-edit',
  templateUrl: './config-edit.component.html',
  styleUrls: ['./config-edit.component.css']
})
export class ConfigEditComponent implements OnInit {
  prefix = '';
  username = 'pmoorey';

  constructor(public dataService: DatabaseService) { }

  ngOnInit(): void {
  }

  onClickAddPrefix() {
    // create prefix and notify
    const notification = new Notification(null, 'Added ' + this.prefix, 'info', this.username, true);
    const prefix = new Prefix(null, this.prefix, this.username);
    this.dataService.createPrefix(prefix);
    this.dataService.createNotification(notification);
  }
}
