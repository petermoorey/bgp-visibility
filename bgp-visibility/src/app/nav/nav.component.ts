import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Settings } from '../settings/settings.model';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {

  constructor(private breakpointObserver: BreakpointObserver, public dataService: DatabaseService) {}

  settings = new Settings('Peter', 'Moorey', 'petermoorey@gmail.com');
  username = 'pmoorey';
  events = [];
  notifications = {};
  notificationsCount = 0;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  processEvents(event: object){
    this.dataService.createNotification(event);
    console.log('received' + event);
  }


  ngOnInit(): void {

    interface Notification {
      message: string;
      seen: boolean;
      severity: string;
      username: string;
    }
    interface Notifications {
      [key: string]: Notification;
    }
    // get notifications
    this.dataService.getNotifications(this.username).subscribe((data: Notifications) =>  {
      this.notifications = data;
      this.notificationsCount = Object.keys(this.notifications).length;
      console.log(this.notifications);
      }
    );
  }
}
