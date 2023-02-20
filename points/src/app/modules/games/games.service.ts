import { Injectable } from '@angular/core';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';
import {
  NamedScore,
  RoundMember,
  RoundScores,
  RoundScoresType,
  UID,
} from 'src/app/interfaces';
import { SharedService } from 'src/app/services/shared.service';
import { selectByIdRoundMember } from 'src/app/store/reducers/round-member.reducer';
import * as fromRoundMembersActions from '../../store/actions/round-member.actions';
import { TelegramService } from '../auth/telegram/telegram.service';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  constructor(
    protected store: Store,
    protected sharedService: SharedService,
    protected telegramService: TelegramService,
  ) {}

  storeRoundScores(scores: RoundScoresType) {
    const updates: Update<RoundMember>[] = [];
    for (const key in scores) {
      // TODO: Object.keys
      if (scores.hasOwnProperty(key)) {
        this.store
          .select(selectByIdRoundMember(key))
          .pipe(first())
          .subscribe((roundMember) => {
            const namedScore: NamedScore = {
              name: scores[key].name,
              value: scores[key].value,
            };
            updates.push({
              id: roundMember._id,
              changes: {
                ...roundMember,
                namedScoresLine: [...roundMember.namedScoresLine, namedScore],
                scoresLine: [...roundMember.scoresLine, namedScore.value],
              },
            });
          });
      }
    }

    // console.log('updates', updates);
    // this.telegramService
    //   .sendMessages(
    //     updates.map((roundmember) => ({
    //       gamerId: roundmember.changes.player,
    //       message: String(roundmember.changes.scoresLine[0]),
    //     })),
    //   )
    //   .subscribe((res) => console.log('send result', res));

    this.store.dispatch(
      fromRoundMembersActions.updateRoundMembers({
        roundMembers: updates,
      }),
    );
  }

  addToNamedScoresLine(namedScore: NamedScore, playerId: UID, roundId: string) {
    const roundMember = this.sharedService.getMemberByPlayerId(
      playerId,
      roundId,
    );
    const changes = {
      ...roundMember,
      namedScoresLine: [...roundMember.namedScoresLine, namedScore],
      scoresLine: [...roundMember.scoresLine, namedScore.value],
    };

    this.store.dispatch(
      fromRoundMembersActions.updateRoundMember({
        roundMember: {
          id: roundMember._id,
          changes,
        },
      }),
    );
    // this.addToScoresLine(namedScore.value, playerId, roundId);
  }

  addToScoresLine(score: number, playerId: UID, roundId: string) {
    const roundMember = this.sharedService.getMemberByPlayerId(
      playerId,
      roundId,
    );
    const changes = {
      ...roundMember,
      scoresLine: [...roundMember.scoresLine, score],
    };

    this.store.dispatch(
      fromRoundMembersActions.updateRoundMember({
        roundMember: {
          id: roundMember._id,
          changes,
        },
      }),
    );
  }

  removeFromNamedScoresLine(
    namedScore: NamedScore,
    playerId: UID,
    roundId: string,
  ) {
    const roundMember = this.sharedService.getMemberByPlayerId(
      playerId,
      roundId,
    );
    const namedScoresLine = [...roundMember.namedScoresLine];
    const index = namedScoresLine.findIndex(
      (ns) => ns.name === namedScore.name,
    );
    if (index !== -1) {
      namedScoresLine.splice(index, 1);
      const changes = {
        ...roundMember,
        namedScoresLine,
      };
      this.store.dispatch(
        fromRoundMembersActions.updateRoundMember({
          roundMember: {
            id: roundMember._id,
            changes,
          },
        }),
      );

      this.removeFromScoresLine(namedScore.value, playerId, roundId);
    }
  }

  removeFromScoresLine(score: number, playerId: UID, roundId: string) {
    const roundMember = this.sharedService.getMemberByPlayerId(
      playerId,
      roundId,
    );
    const scoresLine = [...roundMember.scoresLine];
    const index = scoresLine.indexOf(score);
    scoresLine.splice(index, 1);

    const changes = {
      ...roundMember,
      scoresLine,
    };

    this.store.dispatch(
      fromRoundMembersActions.updateRoundMember({
        roundMember: {
          id: roundMember._id,
          changes,
        },
      }),
    );
  }

  setScoresLine(scoresLine: number[], playerId: UID, roundId: string) {
    const roundMember = this.sharedService.getMemberByPlayerId(
      playerId,
      roundId,
    );
    const changes = {
      ...roundMember,
      scoresLine,
    };

    this.store.dispatch(
      fromRoundMembersActions.updateRoundMember({
        roundMember: {
          id: roundMember._id,
          changes,
        },
      }),
    );
  }
}
