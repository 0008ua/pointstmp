import { Directive, Injector, Input } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IGamer, NamedScore, Round, RoundMember, UID } from 'src/app/interfaces';
import { SharedService } from 'src/app/services/shared.service';
import { selectAllRoundMembers } from 'src/app/store/reducers/round-member.reducer';
import { selectAllRounds } from 'src/app/store/reducers/round.reducer';
import { environment } from 'src/environments/environment';
import { GamesService } from '../games.service';
import { RoundBase, RoundScoresLine, RoundTBase } from './round-interfaces';

@Directive({
  selector: '[appRound]',
})
export class RoundBaseDirective implements RoundBase {
  @Input() playerId: UID;
  @Input() roundId: string;
  sharedService: SharedService;
  gamesService: GamesService;
  actions$: Actions;

  constructor(injector: Injector) {
    this.sharedService = injector.get(SharedService);
    this.gamesService = injector.get(GamesService);
    this.actions$ = injector.get(Actions);
  }

  getMemberByPlayerId(): RoundMember {
    return this.sharedService.getMemberByPlayerId(this.playerId, this.roundId);
  }

  addToScoresLine(score: number): void {
    this.gamesService.addToScoresLine(score, this.playerId, this.roundId);
  }

  removeFromScoresLine(score: number): void {
    this.gamesService.removeFromScoresLine(score, this.playerId, this.roundId);
  }

  setScoresLine(scoresLine: number[], playerId: UID, roundId: string) {
    this.gamesService.setScoresLine(scoresLine, playerId, roundId);
  }
}

@Directive({
  selector: '[appRoundScoresLine]',
})
export class RoundScoresLineDirective extends RoundBaseDirective implements RoundScoresLine {
  constructor(injector: Injector) {
    super(injector);
  }

  addToNamedScoresLine(namedScore: NamedScore, playerId?: UID) {
    this.gamesService.addToNamedScoresLine(namedScore, playerId || this.playerId, this.roundId);
  }

  removeFromNamedScoresLine(namedScore: NamedScore) {
    this.gamesService.removeFromNamedScoresLine(namedScore, this.playerId, this.roundId);
  }
}

@Directive({
  selector: '[appRoundT]',
})
export class RoundTBaseDirective extends RoundScoresLineDirective implements RoundTBase {
  store: Store;
  rounds$: Observable<Round[]>;
  roundMembers$: Observable<RoundMember[]>;
  // roundMembers: RoundMember[];

  constructor(injector: Injector) {
    super(injector);
    this.store = injector.get(Store);
    this.rounds$ = this.store.select(selectAllRounds);
    this.roundMembers$ = this.store.select(selectAllRoundMembers);

    // this.roundMembers$.subscribe((roundMembers) => this.roundMembers = roundMembers)
  }
}
