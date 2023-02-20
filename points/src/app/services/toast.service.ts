import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';

import { filter } from 'rxjs/operators';
import { EntityAction, ofEntityOp, OP_ERROR, OP_SUCCESS, EntityCacheAction } from '@ngrx/data';
import { ToastController } from '@ionic/angular';
import * as fromAnalyticsActions from '../store/actions/analytics.actions';
import * as fromAnalyticsReducer from '../store/reducers/analytics.reducer';
import { AnalyticsActionTypes } from '../store/actions/analytics.actions';
import * as fromAuthActions from '../store/actions/auth.actions';
import { Action, Store } from '@ngrx/store';
import { OperatorFunction } from 'rxjs';

/** Report ngrx-data success/error actions as toast messages **/
@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(private store: Store, public toastController: ToastController) {}

  async presentErrorToast(
    message = 'Error',
    action?: typeof fromAnalyticsActions.error | typeof fromAuthActions.error,
  ) {
    const toast = await this.toastController.create({
      header: 'Error',
      message,
      icon: 'bug-outline',
      position: 'top',
      duration: 4000,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
          },
        },
      ],
    });
    await toast.present();

    const { role, ...rest } = await toast.onDidDismiss();
    if (action) {
      this.store.dispatch(action({ error: null }));
    }
  }
}
