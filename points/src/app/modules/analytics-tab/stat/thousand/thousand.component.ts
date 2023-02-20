import { Component, OnInit } from '@angular/core';
import { RummyPage } from '../rummy/rummy.page';
import { STAT_COMPONENT } from '../stat-interfaces';
import { StatBaseDirective } from '../stat.directive';

@Component({
  selector: 'app-thousand',
  templateUrl: './thousand.component.html',
  styleUrls: ['./thousand.component.scss'],
  providers: [
    {
      provide: STAT_COMPONENT,
      useExisting: ThousandComponent,
    },
  ],
})
export class ThousandComponent extends StatBaseDirective implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {}
}
