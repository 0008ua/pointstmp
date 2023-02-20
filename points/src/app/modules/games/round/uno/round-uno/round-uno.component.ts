import { Component, Injector, OnInit } from '@angular/core';
import { NamedScore } from 'src/app/interfaces';
import { environment } from 'src/environments/environment';
import { ROUND_COMPONENT } from '../../round-interfaces';
import { RoundBaseDirective, RoundScoresLineDirective } from '../../round.directive';

@Component({
  selector: 'app-round-uno',
  templateUrl: './round-uno.component.html',
  styleUrls: ['./round-uno.component.scss'],
  providers: [
    {
      provide: ROUND_COMPONENT,
      useExisting: RoundUnoComponent,
    },
  ],
})
export class RoundUnoComponent extends RoundScoresLineDirective implements OnInit {
  namedScoresEnv = environment.games.uno.namedScores;
  namedScoreLine: NamedScore[] = [];

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {}
}
