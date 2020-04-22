import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-dashboard',
  templateUrl: './event-dashboard.component.html',
  styleUrls: ['./event-dashboard.component.css']
})
export class EventDashboardComponent implements OnInit {

  prefixes = ['192.168.1.0/23', '10.22.1.0/20', '192.168.55.0/24', '192.168.99.0/24'];
  constructor() { }

  ngOnInit(): void {
  }

}
