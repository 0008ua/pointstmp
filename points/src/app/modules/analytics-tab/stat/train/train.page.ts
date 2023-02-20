import { Component, OnInit } from '@angular/core';
import { STAT_COMPONENT } from '../stat-interfaces';
import { StatBaseDirective } from '../stat.directive';

@Component({
  selector: 'app-train',
  templateUrl: './train.page.html',
  styleUrls: ['./train.page.scss'],
  providers: [
    {
      provide: STAT_COMPONENT,
      useExisting: TrainPage,
    },
  ],
})
export class TrainPage extends StatBaseDirective implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {}
}
