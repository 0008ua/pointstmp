import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IGamer, PlayersResult, UID } from 'src/app/interfaces';
import { selectAllPlayers } from 'src/app/store/reducers/player.reducer';

@Component({
  selector: 'app-game-result',
  templateUrl: './game-result.component.html',
  styleUrls: ['./game-result.component.scss'],
})
export class GameResultComponent implements OnInit {
  @Input() results: PlayersResult[];
  @Input() order: 1 | -1;

  resultWithNames: Array<PlayersResult & { name: string; color: string }>;
  players$: Observable<IGamer[]>;
  constructor(private modalController: ModalController, protected store: Store) {}

  ngOnInit() {
    this.players$ = this.store.select(selectAllPlayers);
    this.players$.subscribe((players) => {
      this.resultWithNames = this.results.map((result) => {
        const player = players.find((pl) => pl._id === result._id);
        return { ...result, name: player?.name, color: player?.color };
      });
      this.resultWithNames.sort((a, b) => (a.score - b.score) * this.order);
    });
  }

  confirm() {
    return this.modalController.dismiss(null, 'confirm');
  }
}
