import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { TelegramComponent } from './telegram.component';
import { TelegramRoutingModule } from './telegram-routing.module';

@NgModule({
  declarations: [TelegramComponent],
  imports: [
    CommonModule,
    IonicModule,
    TelegramRoutingModule,
    TranslateModule.forChild({
      extend: true,
    }),
  ],
})
export class TelegramModule {}
