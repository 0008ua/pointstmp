import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../../interfaces';

import { Router } from '@angular/router';
import { redirection } from 'src/app/store/actions/auth.actions';
import {
  selectRedirectionUrl,
  selectUser,
} from '../../store/reducers/auth.reducer';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  host = environment.host;
  url$: Observable<string>;

  constructor(
    private http: HttpClient,
    private store: Store,
    private router: Router,
  ) {
    this.url$ = this.store.select(selectRedirectionUrl);
    this.url$.subscribe((url) => {
      if (url) {
        this.router.navigateByUrl(url);
        this.store.dispatch(redirection({ redirectionUrl: null }));
      }
    });
  }

  // testProtected(): Observable<string> {
  //   // return this.http.post('/api/auth/signin', { body: user });
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       // Authorization: 'token',
  //     }),
  //   };
  //   return this.http.get<string>(
  //     this.host + '/api/auth/protected',
  //     httpOptions,
  //   );
  // }

  signin(user: IUser): Observable<string> {
    // return this.http.post('/api/auth/signin', { body: user });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<string>(
      this.host + '/api/auth/signin',
      user,
      httpOptions,
    );
  }

  signup(user: IUser | null): Observable<string> {
    // return this.http.post('/api/auth/signin', { body: user });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<string>(
      this.host + '/api/auth/signup',
      user,
      httpOptions,
    );
  }

  // sync validator
  matchPassword(abstractControl: AbstractControl): ValidationErrors | null {
    const password = abstractControl.get('password').value;
    const passwordConfirm = abstractControl.get('passwordConfirm').value;
    if (password === passwordConfirm) {
      abstractControl.get('passwordConfirm').setErrors(null);
      return null;
    } else {
      /**
       * set error to 'passwordConfirm' element
       */

      abstractControl.get('passwordConfirm').setErrors({ mismatch: true });
      /**
       * and don't set error (null) to formGroup
       */
      return null;
    }
  }
}
