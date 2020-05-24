import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DatabaseService } from '../services/firestore-db.service';
import { BgpDataService } from '../services/bgp-data.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(public bgpDataService: BgpDataService, public auth: AuthService, private dbService: DatabaseService) { }

  user: User = new User;
  status = '';
  overview;
  asn;
  prefixes;
  peers;
  panelOpenState = false;

  ngOnInit(): void {
    this.auth.user$.subscribe(res => {
    this.user = res;
    });
  }
  onClickAddNetwork(network: string) {
    // create network and notification
    this.dbService.createNotification({
      message: 'Added ' + network,
      seen: false,
      severity: 'info',
      uid: this.user.uid
    });
    this.dbService.createNetwork({
      network: network,
      seen: false,
      alert: true,
      uid: this.user.uid
    });
  }

  onClickAddASN() {
    this.status = 'started';

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
    this.bgpDataService.getAsOverview(this.asn).subscribe((data: ResponseOverview) =>  {
      this.overview = data.data;
      console.log(this.overview.holder);
    });

    // get prefixes
    this.bgpDataService.getAsPrefixes(this.asn).subscribe((data: PrefixResponse) =>  {
      this.prefixes = data.data.prefixes;
    });

    // get peers
    this.bgpDataService.getAsNeighbors(this.asn).subscribe((data: PeersResponse) =>  {
      this.peers = data.data.neighbours;
    });

    this.status = 'finished';
  }
}
