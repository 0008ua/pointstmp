import { Component, ContentChild, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/interfaces';
import { logout } from 'src/app/store/actions/auth.actions';
import {
  selectUser,
  selectUserRole,
} from 'src/app/store/reducers/auth.reducer';
import { StatBase, STAT_COMPONENT } from './stat/stat-interfaces';

@Component({
  selector: 'app-analytics-tab',
  templateUrl: './analytics-tab.page.html',
  styleUrls: ['./analytics-tab.page.scss'],
})
export class AnalyticsTabPage implements OnInit {
  userRole$: Observable<IUser['role']>;
  user$: Observable<IUser>;
  lang: string;

  constructor(
    private store: Store,
    public translate: TranslateService,
    private menuController: MenuController,
  ) {}

  ngOnInit() {
    this.userRole$ = this.store.select(selectUserRole);
    this.user$ = this.store.select(selectUser);
  }

  ionViewWillEnter() {
    this.menuController.enable(true, 'analytics-menu');
    console.log(this.menuController);

  }

  onLogout() {
    this.store.dispatch(logout());
  }

  switchLanguage() {
    this.lang = this.lang === 'en' ? 'uk' : 'en';
    this.translate.use(this.lang);
  }
}
