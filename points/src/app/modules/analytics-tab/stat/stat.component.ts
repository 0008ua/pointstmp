import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GameType, IGamer } from 'src/app/interfaces';
import * as fromAnalyticsActions from 'src/app/store/actions/analytics.actions';
import { selectRating } from 'src/app/store/reducers/analytics.reducer';
import { environment } from 'src/environments/environment';
import { Stat } from './stat-interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.scss'],
})
export class StatComponent implements OnInit {
  stats: Stat[];
  stat: Stat;
  gameType: GameType;
  analytics$: Observable<IGamer[]>;

  constructor(protected store: Store, protected route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.gameType = params.id;
      this.stats = environment.games[this.gameType].stats;
      if (!this.stat) {
        this.stat = this.stats[0];
      }
      console.log('gameType', this.gameType);
      this.store.dispatch(fromAnalyticsActions[this.stat._id]({ gameType: this.gameType }));
    });
    this.analytics$ = this.store.select(selectRating);
  }

  onMenuClickHandler(e: any) {
    this.stat = e.target.value;
    this.store.dispatch(fromAnalyticsActions[this.stat._id]({ gameType: this.gameType }));
  }
}
