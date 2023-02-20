import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { AuthService } from '../modules/auth/auth.service';
import { signinSuccess, storeToken } from '../store/actions/auth.actions';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  host = environment.host;
  refreshInProgress = false;

  constructor(
    private store: Store,
    private http: HttpClient,
    private authService: AuthService,
    private sharedService: SharedService,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return this.sharedService.getToken().pipe(
      switchMap((token) => {
        if (token) {
          req = req.clone({
            headers: req.headers.set('Authorization', token),
          });
        }
        return next.handle(req);
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // get protected resource fail
          // bad token or new guest user without token
          // try to get valid guest token
          const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
            }),
          };
          return this.http
            .post<string>(this.host + '/api/auth/signup', null, httpOptions)
            .pipe(
              catchError((getTokenError: HttpErrorResponse) => {
                // error get valid guest token
                // forward error
                return throwError(getTokenError);
              }),
              switchMap((token: string) => {
                // successeful get valid guest token
                // save new token to store
                this.store.dispatch(signinSuccess({ token }));
                req = req.clone({
                  headers: req.headers.set('Authorization', token),
                });
                // second try to get protected resource
                return next.handle(req);
              }),
            );
        }
        return throwError(error);
      }),
    );
  }
}
