import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/internal-compatibility';

import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.TRY_SIGNUP),
    map((action: AuthActions.TrySignup) => {
      return action.payload;
    }),
    switchMap(
      (authData: { username: string, password: string }) => {
        return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
      }),
    switchMap(
      () => {
        return fromPromise(firebase.auth().currentUser.getIdToken());
      }
    ),
    mergeMap(
      (token: string) => {
        this.router.navigate(['/']);
        return [
          {
            type: AuthActions.SIGNUP
          },
          {
            type: AuthActions.SET_TOKEN,
            payload: token
          }
        ];
      }
    )
  );

  @Effect()
  authSignin = this.actions$.pipe(
    ofType(AuthActions.TRY_SIGNIN),
    map((action: AuthActions.TrySignin) => {
      return action.payload;
    }),
    switchMap(
      (authData: { username: string, password: string }) => {
        return fromPromise(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
      }),
    switchMap(
      () => {
        return fromPromise(firebase.auth().currentUser.getIdToken());
      }
    ),
    mergeMap(
      (token: string) => {
        this.router.navigate(['/']);
        return [
          {
            type: AuthActions.SIGNIN
          },
          {
            type: AuthActions.SET_TOKEN,
            payload: token
          }
        ];
      }
    )
  );

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(
      () => {
        this.router.navigate(['/']);
      }
    )
  );

  constructor(private actions$: Actions, private router: Router) {
  }
}
