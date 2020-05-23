import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Settings } from '../settings/settings.model';
import { DatabaseService } from '../database.service';
import { Notification } from '../notification.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {

  constructor(private breakpointObserver: BreakpointObserver, public dataService: DatabaseService, public auth: AuthService) {}

  notifications: Notification[];
  notificationsUnread: Notification[];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  processEvents(notification: Notification){
    // this.dataService.createNotification(notification);
  }


  ngOnInit() {
    // get notifications
    this.dataService.getNotifications().subscribe(data => {
      this.notifications = data.map(e => {
        return { id: e.payload.doc.id, ...e.payload.doc.data() as Notification} as Notification;
      });
    });
    // get notifications count
    this.dataService.getUnreadNotificationCount().subscribe(data => {
      this.notificationsUnread = data.map(e => {
        return { id: e.payload.doc.id, ...e.payload.doc.data() as Notification} as Notification;
      });
    });
  }

  onClickMarkNotificationsRead() {
    this.notificationsUnread.forEach(notification => {
      notification.seen = true;
      console.log('marking seen: ' + notification.message);
      this.dataService.updateNotification(notification);
    });
  }
}
