import { Component, Injector, OnInit } from '@angular/core';
import { STAT_COMPONENT } from '../stat-interfaces';
import { StatBaseDirective } from '../stat.directive';

@Component({
  selector: 'app-rummy',
  templateUrl: './rummy.page.html',
  styleUrls: ['./rummy.page.scss'],
  providers: [
    {
      provide: STAT_COMPONENT,
      useExisting: RummyPage,
    },
  ],
})
export class RummyPage extends StatBaseDirective implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {}
}
