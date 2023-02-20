import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GameType, IGamer, Round, UID } from 'src/app/interfaces';
import { selectGameType } from 'src/app/store/reducers/app.reducer';
import { selectAllRounds } from 'src/app/store/reducers/round.reducer';

@Component({
  selector: 'app-round',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.scss'],
})
export class RoundComponent implements OnInit {
  @Input() activeRoundId$: Observable<string>;
  @Input() activePlayerId$: Observable<UID>;
  @Input() gameType$: Observable<GameType>;
  @Input() players$: Observable<IGamer[]>;

  rounds$: Observable<Round[]>;
  // gameType$: Observable<GameType>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.rounds$ = this.store.select(selectAllRounds);
    // this.gameType$ = this.store.select(selectGameType);
  }
}
