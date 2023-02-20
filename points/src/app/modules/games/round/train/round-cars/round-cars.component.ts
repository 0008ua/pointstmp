import { Component, Injector, Input, OnInit } from '@angular/core';
import { UID } from 'src/app/interfaces';
import { SharedService } from 'src/app/services/shared.service';
import { environment } from 'src/environments/environment';
import { RoundCars, ROUND_COMPONENT } from '../../round-interfaces';
import { RoundScoresLineDirective } from '../../round.directive';

@Component({
  selector: 'app-round-cars',
  templateUrl: './round-cars.component.html',
  styleUrls: ['./round-cars.component.scss'],
  providers: [
    {
      provide: ROUND_COMPONENT,
      useExisting: RoundCarsComponent,
    },
  ],
})
export class RoundCarsComponent extends RoundScoresLineDirective implements OnInit, RoundCars {
  // @Input() playerId: UID;
  // @Input() roundId: string;

  carsScoresEnv = environment.games.train.carsScores;
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {}

  calcQtyOfArrItems(item: string | number) {
    return this.sharedService.calcQtyOfArrItems(item, this.playerId, this.roundId);
  }

  // addToScoresLine(score: number): void {
  //   this.sharedService.addToScoresLine(score, this.playerId, this.roundId);
  // }

  // removeFromScoresLine(score: number): void {
  //   this.sharedService.removeFromScoresLine(score, this.playerId, this.roundId);
  // }
}
