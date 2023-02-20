import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IGamer } from 'src/app/interfaces';
import { GamerService } from 'src/app/store/gamer-data.service';
import { selectAllPlayers } from 'src/app/store/reducers/player.reducer';
import { TelegramService } from './telegram.service';

@Component({
  selector: 'app-telegram',
  templateUrl: './telegram.component.html',
  styleUrls: ['./telegram.component.scss'],
})
export class TelegramComponent implements OnInit {
  gamers$: Observable<IGamer[]>;

  constructor(
    protected store: Store,
    protected gamerService: GamerService,
    protected telegramService: TelegramService,
  ) {}

  ngOnInit() {
    this.gamers$ = this.gamerService.entities$;
  }

  unsubscibeFromBot(gamerId: string) {
    this.telegramService.unsubscibeFromBot(gamerId).subscribe(
      (result) => {
        console.log('unsubscibeFromBot result', result);
      },
      (error) => {
        console.log('unsubscibeFromBot error', error);
      },
    );
  }
}
