import { Directive, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IGamer, IGame, GameType } from 'src/app/interfaces';
import { Stat, StatBase } from './stat-interfaces';

@Directive({
  selector: '[appStat]',
})
export class StatBaseDirective implements StatBase, OnInit {
  @Input() gameType: GameType;
  @Input() analytics$: Observable<IGamer[]>;
  @Input() stat: Stat;
  math: Math = Math;

  constructor() {}

  ngOnInit() {}

}
