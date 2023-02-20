import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { filter, startWith, switchMap, take, tap } from 'rxjs/operators';
import { IUser } from 'src/app/interfaces';
import { signup } from 'src/app/store/actions/auth.actions';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  @ViewChild('signupFormDirective', { static: false }) signupFormDirective: FormGroupDirective;

  lang: string;
  signupForm: FormGroup;
  inputType: 'password' | 'text' = 'password';
  formSubmitSubject$ = new Subject();

  constructor(
    private authService: AuthService,
    private router: Router,
    public translate: TranslateService,
    private store: Store,
  ) {}

  ngOnInit() {
    this.lang = this.translate.currentLang;

    this.signupForm = new FormGroup(
      {
        name: new FormControl('', {
          updateOn: 'change',
          validators: [
            Validators.pattern('^[a-zA-Z0-9_\\-]+$'),
            Validators.minLength(2),
            Validators.maxLength(60),
            Validators.required,
          ],
          // asyncValidators: [
          //   this.userService.checkLoginUnique(),
          // ],
        }),
        password: new FormControl('', {
          updateOn: 'change',
          validators: [
            Validators.pattern('^[a-zA-Z0-9_\\-]+$'),
            Validators.minLength(2),
            Validators.maxLength(60),
            Validators.required,
          ],
        }),
        passwordConfirm: new FormControl('', {
          updateOn: 'change',
          validators: [
            Validators.pattern('^[a-zA-Z0-9_\\-]+$'),
            Validators.minLength(2),
            Validators.maxLength(60),
            Validators.required,
          ],
        }),
        // email: new FormControl(
        //   '',
        //   {
        //     updateOn: 'change',
        //     validators: [
        //       Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        //       Validators.required,
        //     ],
        //     // asyncValidators: [
        //     //   this.userService.checkEmailUnique(),
        //     // ],
        //   }),
      },
      this.authService.matchPassword,
    );

    // prevent form submit before async validator completes
    this.formSubmitSubject$
      .pipe(
        tap(() => this.signupForm.markAsDirty()),
        switchMap(() =>
          this.signupForm.statusChanges.pipe(
            startWith(this.signupForm.status),
            filter((status) => status !== 'PENDING'),
            take(1),
          ),
        ),
        filter((status) => status === 'VALID'),
      )
      .subscribe((validationSuccessful) => this.onSignup());
  }

  switchInputType() {
    if (this.inputType === 'password') {
      this.inputType = 'text';
    } else {
      this.inputType = 'password';
    }
  }

  onSignup() {
    const user: IUser = {
      name: this.signupForm.get('name').value,
      password: this.signupForm.get('password').value,
    };

    this.store.dispatch(signup({ user }));
    this.resetForm();
  }

  resetForm() {
    if (this.signupFormDirective) {
      this.signupFormDirective.resetForm();
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
