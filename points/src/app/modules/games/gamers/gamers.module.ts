import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChoosePlayersComponent } from './choose-players/choose-players.component';
import { TranslateModule } from '@ngx-translate/core';
import { SelectColorComponent } from './select-color/select-color.component';
import { IonicModule } from '@ionic/angular';
import { CreateGamerComponent } from './create-gamer/create-gamer.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ChoosePlayersComponent, SelectColorComponent, CreateGamerComponent],
  imports: [
    FormsModule,
    CommonModule,
    IonicModule,
    TranslateModule.forChild({
      extend: true,
    }),
  ],
  exports: [ChoosePlayersComponent],
})
export class GamersModule {}
