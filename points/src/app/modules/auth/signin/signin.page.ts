import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { IUser } from 'src/app/interfaces';
import { signin } from 'src/app/store/actions/auth.actions';
// import { Login } from 'src/app/store/actions/user.actions';
import { State } from 'src/app/store/reducers';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  @ViewChild('signinFormDirective', { static: false }) signinFormDirective: FormGroupDirective;
  lang: string;
  signinForm: FormGroup;
  inputType: 'password' | 'text' = 'password';

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store,
    public translate: TranslateService,
  ) {}

  ngOnInit() {
    this.lang = this.translate.currentLang;

    this.signinForm = new FormGroup({
      name: new FormControl('', {
        updateOn: 'change',
        validators: [
          // Validators.pattern('^[a-zA-Z0-9_-]+$'),
          Validators.minLength(2),
          // Validators.maxLength(60),
          Validators.required,
        ],
      }),
      password: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required],
      }),
    });
  }

  switchInputType() {
    if (this.inputType === 'password') {
      this.inputType = 'text';
    } else {
      this.inputType = 'password';
    }
  }

  onSignin() {
    const user: IUser = {
      name: this.signinForm.get('name').value,
      password: this.signinForm.get('password').value,
    };

    this.store.dispatch(signin({ user }));
    this.resetForm();
  }

  resetForm() {
    if (this.signinFormDirective) {
      this.signinFormDirective.resetForm();
    }
  }

  switchLanguage() {
    if (this.lang === 'en') {
      this.lang = 'uk';
    } else {
      this.lang = 'en';
    }
    this.translate.use(this.lang);
  }
}
