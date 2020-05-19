import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-config-list',
  templateUrl: './config-list.component.html',
  styleUrls: ['./config-list.component.css']
})
export class ConfigListComponent implements OnInit {

  username = 'pmoorey';
  prefixList = {};

  constructor(public dataService: DatabaseService) {}

  ngOnInit(): void {

    interface Prefix {
      prefix: string;
      username: string;
    }
    interface Prefixes {
      [key: string]: Prefix;
    }

    // get prefixes
    this.dataService.getMonitoredPrefixes(this.username).subscribe((data: Prefixes) =>  {
      this.prefixList = data;
      console.log(this.prefixList);
    });
  }
  onClickDeletePrefix(prefix) {
    console.log('Deleted ' + prefix);
    // delete prefix
    this.dataService.deleteMonitoredPrefixes(prefix);
  }

}
