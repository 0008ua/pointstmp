import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoundWrapperComponent } from './round-wrapper/round-wrapper.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RoundComponent } from './round.component';
import { RoundRoutesComponent } from './train/round-routes/round-routes.component';
import { RoundLengthComponent } from './train/round-length/round-length.component';
import { RoundStationsComponent } from './train/round-stations/round-stations.component';
import { RoundCarsComponent } from './train/round-cars/round-cars.component';
import { RoundUnoComponent } from './uno/round-uno/round-uno.component';
import { GamersModule } from '../gamers/gamers.module';
import { RoundTWrapperComponent } from './round-t-wrapper/round-t-wrapper.component';
import { RoundThousandComponent } from './thousand/round-thousand/round-thousand.component';
import { RoundRummyComponent } from './rummy/round-rummy/round-rummy.component';

@NgModule({
  declarations: [
    RoundWrapperComponent,
    RoundTWrapperComponent,
    RoundComponent,
    RoundRoutesComponent,
    RoundLengthComponent,
    RoundStationsComponent,
    RoundCarsComponent,
    RoundUnoComponent,
    RoundThousandComponent,
    RoundRummyComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild({
      extend: true,
    }),
    GamersModule,
  ],
  exports: [RoundComponent],
})
export class RoundModule {}
