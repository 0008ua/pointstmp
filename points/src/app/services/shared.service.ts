import { Inject, Injectable } from '@angular/core';
import { from, Observable, of, throwError } from 'rxjs';
import { Storage } from '@capacitor/storage';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import {
  GameType,
  IGame,
  IGamer,
  IUser,
  NamedScore,
  ResultRoundWithTotal,
  Round,
  RoundCfg,
  RoundMember,
  RoundWithTotal,
  UID,
} from '../interfaces';
import { Store } from '@ngrx/store';
import { selectAllPlayers } from '../store/reducers/player.reducer';
import { v4 as uuidv4 } from 'uuid';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { selectAllRounds } from '../store/reducers/round.reducer';
import {
  selectAllRoundMembers,
  selectByIdRoundMember,
} from '../store/reducers/round-member.reducer';
import * as fromAppActions from '../store/actions/app.actions';
import { selectRedirectionUrl, selectGameType } from '../store/reducers/app.reducer';
import { Router } from '@angular/router';
import { redirection } from '../store/actions/app.actions';
import * as fromRoundMembersActions from '../store/actions/round-member.actions';
import { JwtDecodeOptions } from 'jwt-decode';
import { JWT_DECODE, JwtDecode } from '../config/jwt.config';
import { ModalService } from './modal.service';
import { GameResultComponent } from '../modules/games/game/game-result/game-result.component';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  players: IGamer[] = [];
  players$: Observable<IGamer[]>;

  gameType: GameType;
  gameType$: Observable<GameType>;

  rounds: Round[] = [];
  rounds$: Observable<Round[]>;

  roundMembers: RoundMember[] = [];
  roundMembers$: Observable<RoundMember[]>;

  host = environment.host;
  url$: Observable<string>;

  constructor(
    private store: Store,
    private http: HttpClient,
    private router: Router,
    protected modalService: ModalService,
    @Inject(JWT_DECODE) private jwtDecode: JwtDecode,
  ) {
    this.url$ = this.store.select(selectRedirectionUrl);
    this.url$.subscribe((url) => {
      if (url) {
        this.router.navigateByUrl(url);
        this.store.dispatch(redirection({ redirectionUrl: null }));
      }
    });

    this.players$ = this.store.select(selectAllPlayers);
    this.players$.subscribe((players) => {
      this.players = players;
    });

    this.gameType$ = this.store.select(selectGameType);
    this.gameType$.subscribe((gameType) => {
      this.gameType = gameType;
    });

    this.rounds$ = this.store.select(selectAllRounds);
    this.rounds$.subscribe((rounds) => {
      this.rounds = rounds;
    });

    this.roundMembers$ = this.store.select(selectAllRoundMembers);
    this.roundMembers$.subscribe((roundMembers) => {
      this.roundMembers = roundMembers;
    });
  }

  setToStorage(key: string, value: any): Observable<void> {
    return from(Storage.set({ key, value }));
  }

  setToken(token: string): Observable<void> {
    return this.setToStorage('token', token);
  }

  getFromStorage(key: string): Observable<string | null> {
    return from(Storage.get({ key })).pipe(map((getResult) => getResult.value));
  }

  getToken(): Observable<string | null> {
    return this.getFromStorage('token');
  }

  getTokenAndDecode(): Observable<IUser> {
    return this.getToken().pipe(
      map((token) => {
        return this.jwtDecode<IUser>(token);
      }),
    );
  }

  removeFromStorage(key: string): Observable<void> {
    return from(Storage.remove({ key }));
  }

  removeToken(): Observable<void> {
    return this.removeFromStorage('token');
  }

  getPlayerTotalScores(player: string): number {
    let sum = 0;
    this.roundMembers.forEach((roundMember) => {
      if (roundMember.player === player) {
        sum += roundMember.scoresLine.reduce((prev, cur) => prev + cur, 0);
      }
    });
    return sum;
  }

  createClientRoundsWithTotal(): RoundWithTotal[] {
    return this.rounds.map((round) => {
      const players = round.roundMembers.map((memberId) => {
        const member = this.roundMembers.find((roundMember) => roundMember._id === memberId);
        return {
          _id: member.player,
          score: member.scoresLine.reduce((prev, cur) => prev + cur, 0),
        };
      });
      return { _id: round._id, players };
    });
  }

  createResultRoundWithTotal(): ResultRoundWithTotal {
    if (this.gameType !== 'rummy') {
      return {
        _id: 'result',
        players: this.players.map((player) => ({
          _id: player._id,
          score: this.getPlayerTotalScores(player._id),
        })),
      };
    }
    let acc = 0;
    return {
      _id: 'result',
      players: this.players
        .map((player) => {
          const score = this.getPlayerTotalScores(player._id);
          acc += score;
          return {
            _id: player._id,
            score,
          };
        })
        .map((player) => ({ ...player, score: player.score || acc * -1 })),
    };
  }

  createResultOfGame(): IGame {
    return {
      type: this.gameType,
      rounds: [...this.createClientRoundsWithTotal(), this.createResultRoundWithTotal()],
    };
  }

  async presentModalFinishGame(game: IGame) {
    let order = -1; //desc
    if (game.type === 'uno' || game.type === 'rummy') {
      order = 1;
    }
    const results = game.rounds.find((round) => round._id === 'result').players;
    return this.modalService.presentModal(GameResultComponent, { results, order });
  }

  calcQtyOfArrItems(item: string | number, playerId: string, roundId: string): number {
    let count = 0;

    this.getMemberByPlayerId(playerId, roundId).scoresLine.forEach((arrItem) => {
      if (arrItem === item) {
        count++;
      }
    });
    return count;
  }

  calcScores(playerId: UID, roundId: string): number {
    return this.getMemberByPlayerId(playerId, roundId).scoresLine.reduce(
      (prev, cur) => prev + cur,
      0,
    );
  }

  getPlayerColor(playerId: UID): string {
    return this.players.find((player) => player._id === playerId).color;
  }

  getPlayerName(playerId: UID): string {
    return this.players.find((player) => player._id === playerId).name;
  }

  getRoundById(roundId: string): Round {
    return this.rounds.find((round) => round._id === roundId);
  }

  getMemberByPlayerId(playerId: UID, roundId: string): RoundMember {
    const round = this.getRoundById(roundId);
    return this.roundMembers.find(
      (roundMember) =>
        roundMember.player === playerId && round?.roundMembers.includes(roundMember._id),
    );
  }
  getRoundMemberById$(roundMemberId: UID): Observable<RoundMember> {
    return this.store.select(selectByIdRoundMember(roundMemberId));
  }

  logErrorToDB(message: string): Observable<string> {
    // return of(error);
    const httpOptions = {
      headers: new HttpHeaders({
        // eslint-disable-next-line  @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<string>(
      this.host + '/api/logger/log-error-to-db',
      { message },
      httpOptions,
    );
  }
}
