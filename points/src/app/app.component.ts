import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  signin,
  storeUserFromToken,
  signup,
} from './store/actions/auth.actions';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './modules/auth/auth.service';
import jwtDecode from 'jwt-decode';
import {
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  Event,
} from '@angular/router';
import { SharedService } from './services/shared.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  lang: string;

  constructor(
    private store: Store,
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router,
    private sharedService: SharedService,
  ) {
    // static translation initialization
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    // this.lang = 'en';
    // for automatic lang detection
    const browserLang = translate.getBrowserLang();
    this.lang = browserLang.match(/uk|ru/) ? 'uk' : 'en';
    translate.use(this.lang);

    // set to store static translation language
    // this.store.dispatch(new LoadLang());
  }

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // console.log('NavigationStart', event);
      }

      if (event instanceof NavigationEnd) {
        // console.log('NavigationEnd', event);
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator
        // Present error to user
        // console.log('NavigationError', event.error);
      }
    });
  }
}
