import { Component, Injector, Input, OnInit } from '@angular/core';
import { UID } from 'src/app/interfaces';
import { environment } from 'src/environments/environment';
import { Inverse, RoundRoutes } from '../../round-interfaces';
import { RoundScoresLineDirective } from '../../round.directive';
import { ROUND_COMPONENT } from '../../round-interfaces';

@Component({
  selector: 'app-round-routes',
  templateUrl: './round-routes.component.html',
  styleUrls: ['./round-routes.component.scss'],
  providers: [
    {
      provide: ROUND_COMPONENT,
      useExisting: RoundRoutesComponent,
    },
  ],
})
export class RoundRoutesComponent extends RoundScoresLineDirective implements OnInit, RoundRoutes {
  @Input() playerId: UID;
  @Input() roundId: string;

  routesScoresEnv = environment.games.train.routesScores;
  inverse: Inverse = 1;
  numberFn = Number;

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {}

  inverseScore() {
    this.inverse = (this.inverse * -1) as Inverse;
  }
}
