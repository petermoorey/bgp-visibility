import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Prefix} from '../prefix.model';
import { Notification } from '../notification.model';

@Component({
  selector: 'app-config-list',
  templateUrl: './config-list.component.html',
  styleUrls: ['./config-list.component.css']
})
export class ConfigListComponent implements OnInit {

  username = 'pmoorey';
  prefixes: Prefix[];

  constructor(public dataService: DatabaseService) {}

  ngOnInit(): void {

    // get prefixes
    this.dataService.getPrefixes().subscribe(data => {
      this.prefixes = data.map(e => {
        return { id: e.payload.doc.id, ...e.payload.doc.data() as Prefix} as Prefix;
      });
    });
  }

  onClickDeletePrefix(prefix: Prefix) {
    // delete prefix
    const notification = new Notification(null, 'Deleted ' + prefix.prefix, 'info', this.username, false);
    this.dataService.createNotification(notification);
    this.dataService.deletePrefix(prefix);
  }

}
