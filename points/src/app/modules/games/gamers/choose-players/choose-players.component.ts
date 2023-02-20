import {
  Component,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  CollectionSelectors,
  EntityActionFactory,
  MergeStrategy,
} from '@ngrx/data';
import { ReducerManager, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { IGamer, Colors, IGame, GameType } from 'src/app/interfaces';
import {
  GamerDataService,
  GamerService,
} from 'src/app/store/gamer-data.service';
import { AuthService } from '../../../auth/auth.service';
import { AlertController, PopoverController } from '@ionic/angular';
import { SelectColorComponent } from '../select-color/select-color.component';
import { CreateGamerComponent } from '../create-gamer/create-gamer.component';
import { v4 as uuidv4 } from 'uuid';
import { GameService } from 'src/app/store/game-data.service';
import { addRound, loadRounds } from 'src/app/store/actions/round.actions';
import { loadPlayers } from 'src/app/store/actions/player.actions';
import * as fromPlayerReducer from '../../../../store/reducers/player.reducer';
import * as fromAppReducer from '../../../../store/reducers/app.reducer';

import * as fromPlayerActions from '../../../../store/actions/player.actions';
import * as fromAppActions from '../../../../store/actions/app.actions';
import { SharedService } from 'src/app/services/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-choose-players',
  templateUrl: './choose-players.component.html',
  styleUrls: ['./choose-players.component.scss'],
})
export class ChoosePlayersComponent implements OnInit {
  // @Input() gameType: string;
  environment = environment;

  gamers$: Observable<IGamer[]> | Store<IGamer[]>;
  gamers: IGamer[] = [];

  gameType$: Observable<GameType>;
  gameType: GameType;

  filtredGamers: IGamer[] = [];
  // showSelectColor: number | null;
  players: IGamer[] = [];
  players$: Observable<IGamer[]>;
  // recentPlayers$: Observable<IGamer[]>;
  // playersTotal$: Observable<number>;

  playersColors: Colors[];
  filtredColors: Colors[];

  constructor(
    private store: Store,
    public translate: TranslateService,
    private gamerService: GamerService,
    public popoverController: PopoverController,
    public alertController: AlertController,
    private sharedService: SharedService,
  ) {}

  ngOnInit() {
    this.gameType$ = this.store.select(fromAppReducer.selectGameType);
    this.gameType$.subscribe((gameType) => {
      this.gameType = gameType;
      this.playersColors = environment.games[gameType]
        ?.playersColors as Colors[];
      this.filtredColors = environment.games[gameType]
        ?.playersColors as Colors[];
    });

    this.players$ = this.store.select(fromPlayerReducer.selectAllPlayers);
    this.players$.subscribe((players) => {
      this.players = players;
      this.filter();
    });

    this.gamers$ = this.gamerService.entities$;
    this.gamers$.subscribe((gamers) => {
      this.gamers = gamers;
      this.filter();
    });
  }

  startGameHandler() {
    this.store.dispatch(fromAppActions.createRounds());
    // this.sharedService.createRounds(this.gameType);
  }

  async presentPopover(event: Event, component: any, data: any): Promise<any> {
    const popover = await this.popoverController.create({
      component,
      cssClass: 'select-color-popover',
      // event,
      componentProps: data,
      translucent: true,
    });
    await popover.present();
    return await popover.onDidDismiss();
  }

  async showSelectColorPopup(event: Event, index: number) {
    const { data } = await this.presentPopover(event, SelectColorComponent, {
      colors: this.filtredColors,
    });
    if (data) {
      const { color } = data;
      this.chooseColorHandler(color, index);
    }
  }

  async showCreateGamerPopup(event: Event) {
    const { data } = await this.presentPopover(
      event,
      CreateGamerComponent,
      null,
    );
    if (data) {
      const { gamer } = data;
      this.createGamerHandler(gamer);
    }
  }

  filter() {
    this.filtredGamers = this.gamers.filter((gamer) => {
      for (const player of this.players) {
        if (player._id === gamer._id) {
          return false;
        }
      }
      return true;
    });
    const filtredColors = this.playersColors?.filter((color, idx) => {
      for (const player of this.players) {
        if (player.color === color) {
          return false;
        }
      }
      return true;
    });
    this.filtredColors = filtredColors?.length
      ? filtredColors
      : this.filtredColors;
  }

  choosePlayerHandler(e: any, index: number) {
    const players = this.players.map((player, idx) => {
      if (idx === index) {
        const preferredColor = this.filtredGamers[0].color;
        if (this.filtredColors.includes(preferredColor)) {
          return e.target.value;
        } else {
          return { ...e.target.value, color: this.filtredColors[0] };
        }
      }
      return player;
    });
    this.store.dispatch(fromPlayerActions.loadPlayers({ players }));
  }

  chooseColorHandler(color: Colors, index: number) {
    this.players = this.players.map((player, idx) => {
      if (idx === index) {
        return { ...player, color };
      }
      return player;
    });
    this.filter();
  }

  removePlayerHandler(_id: string) {
    this.store.dispatch(fromPlayerActions.deletePlayer({ id: _id }));
  }

  removeAllPlayersHandler() {
    this.store.dispatch(fromPlayerActions.clearPlayers());
  }

  addPlayerHandler(firstEl = true) {
    if (!this.filtredGamers.length) {
      return;
    }
    let candidate = this.filtredGamers[0];
    if (!firstEl) {
      candidate = this.filtredGamers[this.filtredGamers.length - 1];
    }
    const preferredColor = candidate.color;
    if (this.filtredColors.includes(preferredColor)) {
      this.store.dispatch(
        fromPlayerActions.addPlayer({ player: { ...candidate } }),
      );
    } else {
      this.store.dispatch(
        fromPlayerActions.addPlayer({
          player: { ...candidate, color: this.filtredColors[0] },
        }),
      );
    }
    // this.filter();
  }

  createGamerHandler(gamer: IGamer) {
    this.gamerService.add(gamer).subscribe((result) => {
      // console.log(result);
    });
  }
}
