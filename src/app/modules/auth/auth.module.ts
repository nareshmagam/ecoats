import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterComponent } from './register/register.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ErrorPage2Component } from './error-page2/error-page2.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ReactiveFormsModule } from '@angular/forms';
import { UtilSerrvice } from 'src/app/shared/utilities/util.service';
import { UserAuthComponent } from './user-auth/user-auth.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    CarouselModule.forRoot(),
    ReactiveFormsModule
  ],
  declarations: [
    AuthRoutingModule.components,
    LoginComponent,
    ForgotPasswordComponent,
    RegisterComponent,
    ErrorPageComponent,
    ErrorPage2Component,
    UserAuthComponent
  ],
  providers: [
    UtilSerrvice
  ]
})
export class AuthModule { }