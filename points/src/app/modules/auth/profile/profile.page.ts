import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from 'src/app/store/actions/auth.actions';
import { TranslateService } from '@ngx-translate/core';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/interfaces';
import {
  selectUserRole,
  selectUser,
} from 'src/app/store/reducers/auth.reducer';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
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
    this.menuController.enable(true, 'profile-menu');
  }

  onLogout() {
    this.store.dispatch(logout());
  }

  switchLanguage() {
    this.lang = this.lang === 'en' ? 'uk' : 'en';
    this.translate.use(this.lang);
  }
}
