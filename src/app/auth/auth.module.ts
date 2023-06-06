import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { IonicModule } from '@ionic/angular';
import { LoginComponent } from './pages/login/login.component';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
