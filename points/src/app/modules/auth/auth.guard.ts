import { Injectable, OnInit } from '@angular/core';
import {
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanActivate,
} from '@angular/router';
import { Observable, throwError } from 'rxjs';

import { select, Store } from '@ngrx/store';

import { AuthService } from './auth.service';
import { catchError, map, take, tap } from 'rxjs/operators';
import { selectUserRole } from 'src/app/store/reducers/auth.reducer';
import { IUser } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad, CanActivate {
  userRole$: Observable<string> = this.store.select(selectUserRole);

  constructor(private authService: AuthService, private router: Router, private store: Store) {
    // this.userRole$ = this.store.select(selectUserRole);

    this.store
      .select(selectUserRole)
      .pipe(tap((role) => console.log('role change guard', role)))
      .subscribe((_) => _);
  }

  // Prevents fetching lazy loading modules
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.userRole$.pipe(
      map((role) => {
        if (role === 'guest') {
          this.router.navigateByUrl('/auth/signin');
          return false;
        }
        return true;
      }),
      take(1),
    );
  }

  // If lazy loadnig module already fetched and user logged out
  // this guard prevents to activate module
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userRole$.pipe(
      map((role) => {
        if (role === 'guest') {
          this.router.navigateByUrl('/auth/signin');
          return false;
        }
        return true;
      }),
      catchError((e) => {
        return throwError(e);
      }),
      // take(1),
    );
  }
}
