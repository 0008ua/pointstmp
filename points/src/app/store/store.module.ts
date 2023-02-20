import { NgModule } from '@angular/core';
import { DefaultDataServiceConfig, EntityDataModule, EntityDataService } from '@ngrx/data';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
  ActionReducer,
  MetaReducer,
  META_REDUCERS,
  StoreModule,
  USER_PROVIDED_META_REDUCERS,
} from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, metaReducers } from './reducers';

import { GameDataService } from './game-data.service';
import { GamerDataService } from './gamer-data.service';
import { entityMetadata } from './entity-metadata';
import { environment } from 'src/environments/environment';
import { AuthEffects } from './effects/auth.effects';
import { HttpClientModule } from '@angular/common/http';
import { InjectionToken } from '@angular/core';
import { AuthService } from '../modules/auth/auth.service';
import { SharedService } from '../services/shared.service';
import { HydrationEffects } from './effects/hydration.effects';
import { AnalyticsEffects } from './effects/analytics.effects';
// import { StoreAppService } from './store-app.service';
import { AppEffects } from './effects/app.effects';
import { RoundEffects } from './effects/round.effects';
import { RoundMemberEffects } from './effects/round-member.effects';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { PersistStoreEffects } from './effects/persist-store.effects';
import { PlayerEffects } from './effects/player.effects';
import { StoreErrorService } from './store-error.service';

export const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: environment.host + 'api/store/',
  timeout: 5000,
  entityHttpResourceUrls: {
    game: {
      entityResourceUrl: environment.host + 'api/store/game/',
      collectionResourceUrl: environment.host + 'api/store/games/',
    },
    gamer: {
      entityResourceUrl: environment.host + 'api/store/gamer/',
      collectionResourceUrl: environment.host + 'api/store/gamers/',
    },
  },
};

@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),

    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([
      AuthEffects,
      HydrationEffects,
      AnalyticsEffects,
      AppEffects,
      RoundEffects,
      RoundMemberEffects,
      PersistStoreEffects,
      PlayerEffects,
    ]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),

    // Connects RouterModule with StoreModule
    EntityDataModule.forRoot({ entityMetadata }),
  ],
  providers: [
    GameDataService,
    GamerDataService,
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig },
  ],
})
export class AppStoreModule {
  constructor(
    entityDataService: EntityDataService,
    gameDataService: GameDataService,
    gamerDataService: GamerDataService,
    storeErrorService: StoreErrorService,
    // storeAppService: StoreAppService,
  ) {
    entityDataService.registerService('Game', gameDataService);
    entityDataService.registerService('Gamer', gamerDataService);
  }
}
