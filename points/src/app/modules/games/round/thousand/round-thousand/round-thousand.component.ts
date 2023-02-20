import { Component, Injector, Input, OnDestroy, OnInit } from '@angular/core';
import { ofType } from '@ngrx/effects';
import {
  NamedScore,
  RoundMember,
  RoundScoresOptionsType,
  RoundScoresType,
} from 'src/app/interfaces';
import { ROUND_COMPONENT } from '../../round-interfaces';
import { RoundTBaseDirective } from '../../round.directive';
import * as fromAppActions from '../../../../../store/actions/app.actions';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-round-thousand',
  templateUrl: './round-thousand.component.html',
  styleUrls: ['./round-thousand.component.scss'],
  providers: [
    {
      provide: ROUND_COMPONENT,
      useExisting: RoundThousandComponent,
    },
  ],
})
export class RoundThousandComponent
  extends RoundTBaseDirective
  implements OnInit
{
  scores: RoundScoresType = {};
  initialScores: RoundScoresType = {};
  roundScoresOption: RoundScoresOptionsType;
  qtyOfPlayers: number;
  roundMembers: RoundMember[];
  activeRoundMemberId: string;
  isFinished = false;
  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.roundMembers$.subscribe((roundMembers) => {
      this.qtyOfPlayers = roundMembers.length;
      this.roundMembers = roundMembers;

      if (this.checkOnFinishGame() && !this.isFinished) {
        this.isFinished = true;
        return this.store.dispatch(fromAppActions.finishGame());
      }
      if (this.roundMembers.length) {
        this.resetScores();
      }
    });

    // cancel prev game
    this.actions$
      .pipe(ofType(fromAppActions.clearGame))
      .subscribe((_) => (this.scores = {}));
  }

  addTotals(roundMembers: RoundMember[]): RoundMember[] {
    return roundMembers.map((roundMember) => {
      let acc = 0;
      return {
        ...roundMember,
        namedScoresLine: roundMember.namedScoresLine.map(
          (namedScore: NamedScore) => {
            acc = namedScore.value + acc;
            return { ...namedScore, total: acc };
          },
        ),
      };
    });
  }

  changeScoresState(
    roundMemberId: string,
    option: RoundScoresOptionsType,
  ): void {
    if (this.scores[roundMemberId].barrel > 0) {
      return;
    }

    const currentState = this.scores[roundMemberId];
    this.roundScoresOption = option;

    if (currentState.disabled.includes(option)) {
      return;
    }
    if (currentState.name === option) {
      this.scores = JSON.parse(JSON.stringify(this.initialScores));
      return;
    }
    this.scores[roundMemberId].name = option;
    this.scores[roundMemberId].value = option === 'r' ? 0 : -100;

    Object.keys(this.scores)
      .filter((key) => key !== roundMemberId)
      .forEach((key) => {
        this.scores[key] = {
          ...this.initialScores[key],
          value: option === 'r' ? 60 : 0,
        };
      });
  }

  resetScores(): void {
    const activeRoundMemberPosition = this.roundMembers.length
      ? (this.roundMembers[0].namedScoresLine.length + this.qtyOfPlayers) %
        this.qtyOfPlayers
      : 0;
    this.roundMembers.forEach((roundMember, i) => {
      if (i === activeRoundMemberPosition) {
        this.activeRoundMemberId = roundMember._id;
      }

      this.scores[roundMember._id] = {
        name: 'score',
        value: null,
        disabled: [],
        doubleZero: false,
        barrel: 0,
      };

      if (roundMember.namedScoresLine.length > 1) {
        const isDoubleZero =
          roundMember.namedScoresLine[roundMember.namedScoresLine.length - 1]
            .value === 0 &&
          roundMember.namedScoresLine[roundMember.namedScoresLine.length - 2]
            .value === 0;
        if (isDoubleZero) {
          this.scores[roundMember._id].doubleZero = true;
        }
      }

      let acc = 0;
      roundMember.namedScoresLine.map((namedScore: NamedScore) => {
        acc = namedScore.value + acc;
        if (acc >= 900 && acc < 1000) {
          this.scores[roundMember._id].barrel += 1;
        } else {
          this.scores[roundMember._id].barrel = 0;
        }
      });

      const isAlreadyR = roundMember.namedScoresLine.find(
        (score) => score.name === 'r',
      );
      if (isAlreadyR) {
        this.scores[roundMember._id].disabled.push('r');
      }
      const isAlreadyS = roundMember.namedScoresLine.find(
        (score) => score.name === 's',
      );
      if (isAlreadyS) {
        this.scores[roundMember._id].disabled.push('s');
      }
    });
    this.initialScores = JSON.parse(JSON.stringify(this.scores));
  }

  checkOnTrippleZero(): void {
    Object.keys(this.scores).forEach((key) => {
      if (this.scores[key].barrel > 0) {
        return;
      }
      if (this.scores[key].doubleZero && this.scores[key].value === 0) {
        this.scores[key].value = -100;
      }
    });
  }

  checkOnBarrelTimes(): void {
    Object.keys(this.scores).forEach((key) => {
      if (
        this.scores[key].barrel >= this.qtyOfPlayers ||
        this.scores[key].barrel >= 3
      ) {
        let acc = 0;
        this.roundMembers
          .find((roundMember) => roundMember._id === key)
          .namedScoresLine.map((namedScore: NamedScore) => {
            acc = namedScore.value + acc;
          });

        if (acc + this.scores[key].value < 1000) {
          this.scores[key].value = this.customRoundNumber(acc) - 100 - acc;
        }
      }
    });
  }

  checkOnFinishGame(): boolean {
    let isFinishGame = false;
    Object.keys(this.scores).forEach((key) => {
      let acc = 0;
      this.roundMembers
        .find((roundMember) => roundMember._id === key)
        .namedScoresLine.map((namedScore: NamedScore) => {
          acc = namedScore.value + acc;
        });
      if (acc >= 1000) {
        isFinishGame = true;
      }
    });
    return isFinishGame;
  }

  checkGetOnBarrelOrWin(): void {
    Object.keys(this.scores).forEach((key) => {
      let acc = 0;
      this.roundMembers
        .find((roundMember) => roundMember._id === key)
        .namedScoresLine.map((namedScore: NamedScore) => {
          acc = namedScore.value + acc;
        });
      acc = acc + this.scores[key].value;
      if (acc > 900 && acc < 1000 && !this.scores[key].barrel) {
        this.scores[key].value = this.scores[key].value - (acc - 900);
      }
      if (acc >= 1000) {
        this.scores[key].value = this.scores[key].value - (acc - 1000);
      }
    });
  }

  checkOnValueIsNumber() {
    Object.keys(this.scores).forEach((key) => {
      if (typeof this.scores[key].value !== 'number') {
        this.scores[key].value = 0;
      }
    });
  }

  checkOnRoundedValue() {
    Object.keys(this.scores).forEach((key) => {
      if (!this.scores[key].barrel) {
        this.scores[key].value = this.customRoundNumber(this.scores[key].value);
      }
    });
  }

  storeRoundScores(): void {
    this.checkOnValueIsNumber();
    this.checkOnTrippleZero();
    this.checkOnBarrelTimes();
    this.checkGetOnBarrelOrWin();
    this.checkOnRoundedValue();
    this.gamesService.storeRoundScores(this.scores);
  }

  private customRoundNumber(n: number): number {
    const int = Math.floor(n);
    return int % 10 <= 5 ? Math.floor(int / 10) * 10 : Math.ceil(int / 10) * 10;
  }
}
