import { Component, OnInit } from '@angular/core';
import { BgpDataService } from '../bgp-data.service';

@Component({
  selector: 'app-event-dashboard',
  templateUrl: './event-dashboard.component.html',
  styleUrls: ['./event-dashboard.component.css']
})
export class EventDashboardComponent implements OnInit {

  prefixes = [];
  peers = [];
  ASN = '';
  ASNStatus = '';
  REST_API_QUERY = '';

  constructor(private dataService: BgpDataService) {}

  ngOnInit() {
  }

  onClickAddASN() {
    this.ASNStatus = 'entered';
    // get prefixes
    this.REST_API_QUERY = 'announced-prefixes/data.json?resource=AS' + this.ASN + '&starttime=2019-12-12T12:00';
    this.dataService.sendGetRequest(this.REST_API_QUERY).subscribe((data: any[]) =>  {
      this.prefixes = data.data.prefixes;
    });
    // get peers
    this.REST_API_QUERY = 'asn-neighbours/data.json?resource=AS' + this.ASN;
    this.dataService.sendGetRequest(this.REST_API_QUERY).subscribe((data: any[]) =>  {
      this.peers = data.data.neighbours;
    });
  }
}
