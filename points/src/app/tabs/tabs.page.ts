import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces';
import { selectLoading } from '../store/reducers/app.reducer';
import { selectUser, selectUserRole } from '../store/reducers/auth.reducer';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnInit {
  user$: Observable<IUser | null>;
  userRole$: Observable<string>;
  loading$: Observable<boolean>;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.user$ = this.store.select(selectUser);
    this.loading$ = this.store.select(selectLoading);
    this.userRole$ = this.store.select(selectUserRole);
  }
}
