import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/interfaces';
import { logout } from 'src/app/store/actions/auth.actions';
import { GamerService } from 'src/app/store/gamer-data.service';
import { selectUser, selectUserRole } from 'src/app/store/reducers/auth.reducer';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {
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
    this.menuController.enable(true, 'games-menu');
  }

  onLogout() {
    this.store.dispatch(logout());
  }

  switchLanguage() {
    this.lang = this.lang === 'en' ? 'uk' : 'en';
    this.translate.use(this.lang);
  }
}
