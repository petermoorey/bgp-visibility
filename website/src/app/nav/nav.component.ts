import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Notification } from '../models/notification.model';
import { AuthService } from '../services/auth.service';
import { DatabaseService } from '../services/firestore-db.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {

  constructor(private breakpointObserver: BreakpointObserver, public auth: AuthService, private dbService: DatabaseService) {}
  user: User = new User;
  notifications: Notification[] = [];
  notificationsUnread: Notification[] = [];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  ngOnInit() {
    this.auth.user$.subscribe(res => {
      this.user = res;
      if (this.user != null) {
        this.getNotifications(this.user.uid);
        this.getNotificationsUnread(this.user.uid);
        console.log(this.user.displayName);
        console.log(this.notifications);
      }
    });
  }


  getNotifications(uid: string) {
    this.notifications = [];
    this.dbService.getNotficationPromise(uid).subscribe(data => {
      this.notifications = data.map(e => {
        return { id: e.payload.doc.id, ...e.payload.doc.data() as Notification} as Notification;
      });
    });
  }

  getNotificationsUnread(uid: string) {
    this.notificationsUnread = [];
    this.dbService.getNotficationUnreadPromise(uid).subscribe(data => {
      this.notificationsUnread = data.map(e => {
        return { id: e.payload.doc.id, ...e.payload.doc.data() as Notification} as Notification;
      });
    });
  }

  onClickMarkNotificationsRead() {
    this.notificationsUnread.forEach(notification => {
      notification.seen = true;
      console.log('marking seen: ' + notification.message);
      this.dbService.updateNotification(notification);
    });
  }
}
