import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  filter,
  map,
  mergeMap,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';

import * as fromAnalyticsActions from '../actions/analytics.actions';
import * as fromAuthActions from '../actions/auth.actions';
import * as fromRoundActions from '../actions/round.actions';
import * as fromRoundMemberActions from '../actions/round-member.actions';
import * as fromRoundMemberReducer from '../reducers/round-member.reducer';
import * as fromRoundReducer from '../reducers/round.reducer';
import * as fromAppActions from '../actions/app.actions';
import * as fromPlayerActions from '../actions/player.actions';
import { routerNavigatedAction } from '@ngrx/router-store';

import * as fromAppReducer from '../reducers/app.reducer';
import * as fromPlayerReducer from '../reducers/player.reducer';
import * as fromPersistStoreReducer from '../reducers/persist-store.reducer';

import { GameType, IGame, Round, RoundCfg } from 'src/app/interfaces';
import { combineLatest, of, OperatorFunction } from 'rxjs';
import { Store } from '@ngrx/store';
import { v4 as uuidv4 } from 'uuid';
import { environment } from 'src/environments/environment';
import { SharedService } from 'src/app/services/shared.service';
import { GameService } from '../game-data.service';
import { EntityAction, EntityOp, ofEntityOp, ofEntityType } from '@ngrx/data';
import { once } from 'events';
import { TelegramService } from 'src/app/modules/auth/telegram/telegram.service';

@Injectable()
export class AppEffects {
  setLoading = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAnalyticsActions.loading, fromAuthActions.loading),
      map((action) => fromAppActions.loading({ loading: action.loading })),
    );
  });

  cancelLoading = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromRoundActions.clearRounds),
      map((_) => fromAppActions.loading({ loading: false })),
    );
  });

  finishGame = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(fromAppActions.finishGame),
        mergeMap(() => {
          const game: IGame = this.sharedService.createResultOfGame();
          //save to db
          return this.gameService.add(game).pipe(
            switchMap((_) => this.sharedService.presentModalFinishGame(game)),
            catchError((error) => [fromAppActions.loading({ loading: false })]),
          );
        }),
      );
    },
    { dispatch: false },
  );

  gameStoredToDbSuccess = createEffect(() => {
    return this.actions$.pipe(
      ofEntityType(['game']),
      ofEntityOp([EntityOp.SAVE_ADD_ONE_SUCCESS]),
      tap((_) => console.log('gameStoredToDbSuccess', _)),
      map(() => fromAppActions.clearGame()),
      catchError((error) => [fromAppActions.loading({ loading: false })]),
    );
  });

  gameType = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigatedAction),
      concatLatestFrom(() => this.store.select(fromAppReducer.selectGameType)),
      map(([{ payload }, gameType]) => {
        const { urlAfterRedirects } = payload.event;
        const payloadGameType = urlAfterRedirects.split('/');
        if (
          payloadGameType[1] === 'games' ||
          payloadGameType[1] === 'analytics'
        ) {
          if (!gameType) {
            // initial state, get gameType from url
            return fromAppActions.gameType({
              gameType: payloadGameType[2] as GameType,
            });
          }
          if (payloadGameType[2] !== gameType) {
            // fire action only if game was changed
            // change game type and clear previous game
            return fromAppActions.gameTypeAndClearGame({
              gameType: payloadGameType[2] as GameType,
            });
          }
        }
        return fromAppActions.nop();
      }),
    );
  });

  clearGame = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAppActions.gameTypeAndClearGame),
      map(() => fromAppActions.clearGame()),
    );
  });

  clearRounds = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAppActions.clearGame),
      map((_) => fromRoundActions.clearRounds()),
    );
  });

  clearRoundMembers = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAppActions.clearGame),
      map((_) => fromRoundMemberActions.clearRoundMembers()),
    );
  });

  addRounds = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAppActions.loadGame),
      map(({ rounds }) => fromRoundActions.addRounds({ rounds })),
    );
  });

  addRoundMembers = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAppActions.loadGame),
      map(({ roundMembers }) =>
        fromRoundMemberActions.addRoundMembers({ roundMembers }),
      ),
    );
  });

  checkOpenNextRound = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromRoundMemberActions.updateRoundMembersSuccess),
      concatLatestFrom(() => this.store.select(fromAppReducer.selectGameType)),

      filter(([action, gameType]) => false), // gameType === 'thousand'),

      concatLatestFrom(() =>
        this.store.select(fromRoundMemberReducer.selectAllRoundMembers),
      ),
      map(([action, roundMembers]) => {
        const qtyOfPlayedSubrounds =
          roundMembers[roundMembers.length - 1].namedScoresLine.length;
        const qtyOfPlayers = new Set(
          roundMembers.map((roundMember) => roundMember.player),
        ).size;
        if (qtyOfPlayedSubrounds >= qtyOfPlayers) {
          // TODO  === or error
          return fromAppActions.openNextRound();
        }
        return fromAppActions.nop();
      }),
    );
  });

  openNextRound = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAppActions.openNextRound),
      concatLatestFrom(() => [
        this.store.select(fromRoundReducer.selectAllRounds),
        this.store.select(fromPlayerReducer.selectAllPlayers),
        this.store.select(fromAppReducer.selectGameType),
      ]),
      map(([action, rounds, players, gameType]) => {
        const nextRound: RoundCfg = environment.games[gameType].rounds[1];

        const members = players.map((player) => ({
          _id: uuidv4(),
          player: player._id,
          scoresLine: nextRound.initialScoresLine,
          namedScoresLine: nextRound.initialNamedScoresLine,
        }));
        const newRoundMembers = [...members];
        const newRounds = [
          {
            _id: nextRound._id + (rounds.length + 1),
            roundMembers: members.map((member) => member._id),
            clientGame: rounds[0].clientGame,
            icon: nextRound.icon,
            name: nextRound._id,
            namePostfix: rounds.length + 1 + '',
          },
        ];
        return fromAppActions.loadGame({
          roundMembers: newRoundMembers,
          rounds: newRounds,
        });
      }),
    );
  });

  createRounds = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromAppActions.createRounds),
      concatLatestFrom(() => [
        this.store.select(fromPlayerReducer.selectAllPlayers),
        this.store.select(fromAppReducer.selectGameType),
      ]),
      map(([action, players, gameType]) => {
        const clientGame = {
          _id: uuidv4(),
          type: gameType,
        };
        const roundsCfg: RoundCfg[] = environment.games[gameType].rounds;
        let roundMembers = [];
        const rounds: Round[] = roundsCfg
          .filter((roundCfg: RoundCfg) => roundCfg._id !== 'start')
          .map((roundCfg: RoundCfg) => {
            const members = players.map((player) => ({
              _id: uuidv4(),
              player: player._id,
              scoresLine: roundCfg.initialScoresLine,
              namedScoresLine: roundCfg.initialNamedScoresLine,
            }));
            roundMembers = [...roundMembers, ...members];
            return {
              _id: roundCfg._id + roundCfg.namePostfix,
              roundMembers: members.map((member) => member._id),
              clientGame,
              icon: roundCfg.icon,
              name: roundCfg._id,
              namePostfix: roundCfg.namePostfix,
            };
          });
        return fromAppActions.loadGame({ roundMembers, rounds });
      }),
    );
  });

  environment = environment;
  constructor(
    private actions$: Actions<
      fromAppActions.CoreActionsUnion | EntityAction<any>
    >,
    private store: Store,
    private sharedService: SharedService,
    private gameService: GameService,
    private telegramService: TelegramService,
  ) {}
}
