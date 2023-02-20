import { Component, Injector, Input, OnInit } from '@angular/core';
import { RoundMember, UID } from 'src/app/interfaces';
import { SharedService } from 'src/app/services/shared.service';
import { environment } from 'src/environments/environment';
import { RoundLongest } from '../../round-interfaces';
import { ROUND_COMPONENT } from '../../round-interfaces';
import { RoundBaseDirective } from '../../round.directive';

@Component({
  selector: 'app-round-length',
  templateUrl: './round-length.component.html',
  styleUrls: ['./round-length.component.scss'],
  providers: [
    {
      provide: ROUND_COMPONENT,
      useExisting: RoundLengthComponent,
    },
  ],
})
export class RoundLengthComponent extends RoundBaseDirective implements OnInit, RoundLongest {
  // @Input() playerId: UID;
  // @Input() roundId: string;

  longestRouteScoreEnv = environment.games.train.longestRouteScore;
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {}

  // getMemberByPlayerId(): RoundMember {
  //   return super.sharedService.getMemberByPlayerId(this.playerId, this.roundId);
  // }

  onMarkLongestHandler(e: any) {
    const checked = e.target.checked;
    if (checked) {
      this.setScoresLine([this.longestRouteScoreEnv], this.playerId, this.roundId);
    } else {
      this.setScoresLine([], this.playerId, this.roundId);
    }
  }
}
