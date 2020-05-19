import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private url = 'https://bgp-visibility.firebaseio.com/';

  constructor(private httpClient: HttpClient) { }

  public getNotifications(username: string){
    const query = 'notifications.json?orderBy="username"&equalTo="' + username + '"';
    return this.httpClient.get(this.url + query);
  }

  public createNotification(data: object){
    const query = 'notifications.json';
    return this.httpClient.post(this.url + query, data)
    .subscribe(
      data => console.log('success', data),
      error => console.log('oops', error)
    );
  }

  public getMonitoredPrefixes(username: string){
    const query = 'monitored_prefixes.json?orderBy="username"&equalTo="' + username + '"';
    return this.httpClient.get(this.url + query);
  }

  public deleteMonitoredPrefixes(prefix: string){
    const query = 'monitored_prefixes/' + prefix + '.json';
    return this.httpClient.delete(this.url + query)
    .subscribe(
      data => console.log('success', data),
      error => console.log('oops', error)
    );
  }

  public createMonitoredPrefixes(data: object){
    const query = 'monitored_prefixes.json';
    return this.httpClient.post(this.url + query, data)
    .subscribe(
      data => console.log('success', data),
      error => console.log('oops', error)
    );
  }
}
