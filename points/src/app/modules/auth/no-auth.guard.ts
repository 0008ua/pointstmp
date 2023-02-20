import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanActivate,
  Route,
  UrlSegment,
} from '@angular/router';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { catchError, map, take, tap } from 'rxjs/operators';
import { selectUserRole } from 'src/app/store/reducers/auth.reducer';
import { IUser } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  userRole$: Observable<string> = this.store.select(selectUserRole);
  constructor(private router: Router, private store: Store) {}

  // Prevents fetching lazy loading modules
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    // const userRole$ = this.store.select(selectUserRole);

    return this.userRole$.pipe(
      map((role) => {
        if (role === 'member') {
          this.router.navigateByUrl('/auth/profile');
          return false;
        }
        return true;
      }),
      take(1),
    );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // const userRole$ = this.store.select(selectUserRole);
    return this.userRole$.pipe(
      map((userRole) => {
        if (userRole === 'member') {
          this.router.navigateByUrl('/auth/profile');
          return false;
        }
        return true;
      }),
      // take(1),
    );
  }
}
