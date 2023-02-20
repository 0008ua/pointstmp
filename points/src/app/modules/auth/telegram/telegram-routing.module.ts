import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TelegramComponent } from './telegram.component';

const routes: Routes = [
  {
    path: '',
    component: TelegramComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TelegramRoutingModule {}
