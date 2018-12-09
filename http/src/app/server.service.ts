import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ServerService {
  constructor(private http: Http) {
  }

  storeServers(servers: any[]) {
    // return this.http.post('https://rorra-udemy-ng-http.firebaseio.com/data.json', servers);
    return this.http.put('https://rorra-udemy-ng-http.firebaseio.com/data.json', servers);
  }

  getServers() {
    return this.http.get('https://rorra-udemy-ng-http.firebaseio.com/data.json')
      .pipe(
        map((response: any) => {
          const data = response.json();
          return data;
        })
      );
  }

  getAppName() {
    return this.http.get('https://rorra-udemy-ng-http.firebaseio.com/appName.json')
      .pipe(
        map((response: any) => {
          return response.json();
        })
      );
  }
}
