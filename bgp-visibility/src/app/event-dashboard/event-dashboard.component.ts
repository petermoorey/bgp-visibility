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
  peersNames = [];
  overview = '';
  ASN = '';
  Status = '';
  REST_API_QUERY = '';


  constructor(public dataService: BgpDataService) {}

  ngOnInit() {
  }

  onClickAddASN() {
    this.Status = 'started';

    // get overview
    this.dataService.getAsOverview(this.ASN).subscribe((data: any[]) =>  {
      this.overview = data.data;
    });

    // get prefixes
    this.dataService.getAsPrefixes(this.ASN).subscribe((data: any[]) =>  {
      this.prefixes = data.data.prefixes;
    });

    // get peers
    this.dataService.getAsNeighbors(this.ASN).subscribe((data: any[]) =>  {
      this.peers = data.data.neighbours;
    });

    // this.peers.forEach(function(value) {
    //   console.log('processing' + value.asn);
    //   this.dataService.getAsOverview('72').subscribe((data: any[]) =>  {
    //     console.log('made api call');
    //     // console.log(data.data);
    //     // this.peersNames.push(data.data.holder);
    //   });
    // });

    this.Status = 'finished';
  }
}
