import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BgpDataService {
  private URL = 'https://stat.ripe.net/data/';

  constructor(private httpClient: HttpClient) { }
  public sendGetRequest(REST_API_QUERY){
    return this.httpClient.get(this.URL + REST_API_QUERY);
  }
}
