import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';

import { filter } from 'rxjs/operators';
import { EntityAction, ofEntityOp, OP_ERROR, OP_SUCCESS, EntityCacheAction } from '@ngrx/data';
import { ModalController, ToastController } from '@ionic/angular';
import * as fromAnalyticsActions from '../store/actions/analytics.actions';
import * as fromAnalyticsReducer from '../store/reducers/analytics.reducer';
import { AnalyticsActionTypes } from '../store/actions/analytics.actions';
import * as fromAuthActions from '../store/actions/auth.actions';
import { Action, Store } from '@ngrx/store';
import { OperatorFunction } from 'rxjs';

/** Report ngrx-data success/error actions as toast messages **/
@Injectable({ providedIn: 'root' })
export class ModalService {
  constructor(private store: Store, public modalController: ModalController) {}
  async presentModal(component: any, data: any) {
    const modal = await this.modalController.create({
      component,
      componentProps: data,
    });
    modal.present();

    return modal.onWillDismiss();
  }
}
