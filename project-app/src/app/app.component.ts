import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: "AIzaSyAJ6Akz-RSD9ho6VZ_mPKY_yyYtoRKlpXw",
      authDomain: "rorra-udemy-ng-http.firebaseapp.com"
    });
  }

  onNavigate(feature: string): void {
    this.loadedFeature = feature;
  }
}
