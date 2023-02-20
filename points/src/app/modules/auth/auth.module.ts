import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthRoutingModule],
})
export class AuthModule {}
