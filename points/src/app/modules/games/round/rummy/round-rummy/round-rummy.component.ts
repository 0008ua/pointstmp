import { Component, Injector, OnInit } from '@angular/core';
import { NamedScore } from 'src/app/interfaces';
import { environment } from 'src/environments/environment';
import { ROUND_COMPONENT } from '../../round-interfaces';
import { RoundBaseDirective, RoundScoresLineDirective } from '../../round.directive';

@Component({
  selector: 'app-round-rummy',
  templateUrl: './round-rummy.component.html',
  styleUrls: ['./round-rummy.component.scss'],
  providers: [
    {
      provide: ROUND_COMPONENT,
      useExisting: RoundRummyComponent,
    },
  ],
})
export class RoundRummyComponent extends RoundScoresLineDirective implements OnInit {
  namedScoresEnv = environment.games.rummy.namedScores;
  namedScoreLine: NamedScore[] = [];

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {}
}
