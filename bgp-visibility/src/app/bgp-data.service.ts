import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BgpDataService {
  private url = 'https://stat.ripe.net/data/';

  constructor(private httpClient: HttpClient) { }

  public getAsOverview(ASN){
    const query = 'as-overview/data.json?resource=AS' + ASN + '&starttime=2020-01-12T12:00';
    return this.httpClient.get(this.url + query);
  }
  public getAsPrefixes(ASN){
    const query = 'announced-prefixes/data.json?resource=AS' + ASN + '&starttime=2019-12-12T12:00';
    return this.httpClient.get(this.url + query);
  }
  public getAsNeighbors(ASN){
    const query = 'asn-neighbours/data.json?resource=AS' + ASN;
    return this.httpClient.get(this.url + query);
  }
}
