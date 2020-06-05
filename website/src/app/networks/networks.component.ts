import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { Network } from '../models/network.model';
import { Event} from '../models/event.model';
import { AuthService } from '../services/auth.service';
import { DatabaseService } from '../services/firestore-db.service';
import { NetworkDialogComponent } from './events-dialog/events-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-networks',
  templateUrl: './networks.component.html',
  styleUrls: ['./networks.component.css']
})
export class NetworksComponent implements OnInit {

  constructor(public auth: AuthService, private dbService: DatabaseService, public dialog: MatDialog) { }

  user: User = new User;
  networks: Network[] = [];
  events: Event[] = [];
  displayedColumns: string[] = ['network', 'number_events', 'settings.notifyEmail', 'settings.notifyWebhook', 'delete'];

  ngOnInit() {
    this.auth.user$.subscribe(res => {
      this.user = res;
      this.getNetworks(this.user.uid);
      this.getEvents(this.user.uid);
    });
  }
  getNetworks(uid: string) {
    this.networks = [];
    this.dbService.getNetworkPromise(uid).subscribe(data => {
      this.networks = data.map(e => {
        return { id: e.payload.doc.id, ...e.payload.doc.data() as Network} as Network;
      });
    });
  }
  getEvents(uid: string) {
    this.events = [];
    this.dbService.getEventPromise(uid).subscribe(data => {
      this.events = data.map(e => {
        return { id: e.payload.doc.id, ...e.payload.doc.data() as Event} as Event;
      });
    });
  }
  getEventCountOriginChanged(network) {
    let count1 = 0;
    this.events.forEach(element => {
      if (element.network === network && element.type === 'as-origin-change') {
        count1 ++;
      }
    });
    return count1;
  }
  getEventCountPathChange(network) {
    let count = 0;
    this.events.forEach(element => {
      if (element.network === network && element.type === 'as-path-change') {
        count ++;
      }
    });
    return count;
  }
  onClickDeleteNetwork(network: Network) {
    // delete network and send notification
    this.dbService.deleteNetwork(network.id);
    this.dbService.createNotification({
      message: 'Deleted ' + network.network,
      seen: false,
      severity: 'info',
      uid: this.user.uid
    });
  }
  openDialog(events: Event[]) {
    this.dialog.open(NetworkDialogComponent, {
      data: events,
      maxHeight: '90vh',
      width: '60vh'
    });
  }
}
