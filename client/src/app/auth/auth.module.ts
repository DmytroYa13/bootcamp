import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared-module.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { LoaderModule } from '../loader/loader.module';

const components = [LoginComponent, RegisterComponent];

const routes: Routes = [

  { path: 'register', component: RegisterComponent },

  { path: 'login', component: LoginComponent }

];

@NgModule({
  declarations: [...components],
  exports: [...components],
  imports: [
    CommonModule,
    SharedModule,
    LoaderModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class AuthModule { }
