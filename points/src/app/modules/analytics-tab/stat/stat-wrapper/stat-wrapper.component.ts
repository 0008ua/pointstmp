import { Component, ContentChild, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GameType } from 'src/app/interfaces';
import { selectLoading } from 'src/app/store/reducers/analytics.reducer';
import { Stat, StatBase, STAT_COMPONENT } from '../stat-interfaces';

@Component({
  selector: 'app-stat-wrapper',
  templateUrl: './stat-wrapper.component.html',
  styleUrls: ['./stat-wrapper.component.scss'],
})
export class StatWrapperComponent implements OnInit {
  @Input() gameType: GameType;
  @Input() stat: Stat;
  @ContentChild(STAT_COMPONENT, { static: true })
  statComponent: StatBase;
  loading$: Observable<boolean>;
  array = Array;

  constructor(protected store: Store) {}

  ngOnInit() {
    this.loading$ = this.store.select(selectLoading);
  }
}
