import { Component, OnInit } from '@angular/core';
import { BgpDataService } from '../bgp-data.service';
import { DatabaseService } from '../database.service';
import { Notification } from '../notification.model';
import { Prefix } from '../prefix.model';

@Component({
  selector: 'app-event-dashboard',
  templateUrl: './event-dashboard.component.html',
  styleUrls: ['./event-dashboard.component.css']
})
export class EventDashboardComponent implements OnInit {

  prefixes = [];
  peers = [];
  peersNames = [];
  overview;
  ASN = '';
  Status = '';
  REST_API_QUERY = '';
  panelOpenState = false;
  username = 'pmoorey';

  constructor(public bgpDataService: BgpDataService, public dataService: DatabaseService) {}

  ngOnInit() {
  }
  onClickAddPrefix(prefixData: string) {
    // create prefix and notify
    const notification = new Notification(null, 'Added ' + prefixData, 'info', this.username, false);
    const prefix = new Prefix(null, prefixData, this.username, true);
    this.dataService.createPrefix(prefix);
    this.dataService.createNotification(notification);
  }

  onClickAddASN() {
    this.Status = 'started';

    interface Prefix {
      prefix: string;
    }

    interface Prefixes {
      prefixes: Prefix[];
    }

    interface PrefixResponse {
      data: Prefixes;
    }

    interface Peer {
      prefix: string;
    }

    interface Peers {
      neighbours: Peer[];
    }

    interface PeersResponse {
      data: Peers;
    }

    interface Block{
      name: string;
      desc: string;
    }
    interface Overview {
      resource: string;
      block: Block;
      holder: string;
      announced: boolean;
    }
    interface ResponseOverview {
      data: Overview;
    }

    // get overview
    this.bgpDataService.getAsOverview(this.ASN).subscribe((data: ResponseOverview) =>  {
      this.overview = data.data;
      console.log(this.overview.holder);
    });

    // get prefixes
    this.bgpDataService.getAsPrefixes(this.ASN).subscribe((data: PrefixResponse) =>  {
      this.prefixes = data.data.prefixes;
    });

    // get peers
    this.bgpDataService.getAsNeighbors(this.ASN).subscribe((data: PeersResponse) =>  {
      this.peers = data.data.neighbours;
    });

    // this.peers.forEach(function(value) {
    //   console.log('processing' + value.asn);
    //   this.bgpDataService.getAsOverview('72').subscribe((data: any[data]) =>  {
    //     console.log('made api call');
    //     // console.log(data.data);
    //     // this.peersNames.push(data.data.holder);
    //   });
    // });

    this.Status = 'finished';
  }
}
