import { Component, ContentChild, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GameType, Round, RoundMember, UID } from 'src/app/interfaces';
import { SharedService } from 'src/app/services/shared.service';
import { RoundBase, RoundBaseWrapper, ROUND_COMPONENT } from '../round-interfaces';
import { selectGameType, selectLoading } from '../../../../store/reducers/app.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-round-wrapper',
  templateUrl: './round-wrapper.component.html',
  styleUrls: ['./round-wrapper.component.scss'],
})
export class RoundWrapperComponent implements OnInit, RoundBaseWrapper {
  @ContentChild(ROUND_COMPONENT, { static: true })
  roundComponent: RoundBase;
  @Input() playerId: UID;
  @Input() roundId: string;
  gameType$: Observable<GameType>;
  loading$: Observable<boolean>;
  gameType: GameType;

  constructor(public sharedService: SharedService, private store: Store) {}

  ngOnInit() {
    this.loading$ = this.store.select(selectLoading);
    this.gameType$ = this.store.select(selectGameType);
    this.gameType$.subscribe((gameType) => (this.gameType = gameType));
  }

  getRoundById(): Round {
    return this.sharedService.getRoundById(this.roundId);
  }

  calcScores(): number {
    return this.getMemberByPlayerId()?.scoresLine.reduce((prev, cur) => prev + cur, 0);
  }

  getPlayerColor(): string {
    return this.sharedService.getPlayerColor(this.playerId);
  }

  getPlayerName(): string {
    return this.sharedService.getPlayerName(this.playerId);
  }

  getMemberByPlayerId(): RoundMember {
    return this.sharedService.getMemberByPlayerId(this.playerId, this.roundId);
  }
}
