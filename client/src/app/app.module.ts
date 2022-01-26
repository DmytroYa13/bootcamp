import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PostsModule } from './posts/posts.module';
import { SharedModule } from './shared/shared-module.module';
import { AuthModule } from './auth/auth.module';
import { LoaderModule } from './loader/loader.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/interceptors/token.interceptor';
import { CabinetModule } from './cabinet/cabinet.module';
import { environment } from 'src/environments/environment';
import { API_BASE_URL } from './shared/InjectionTokens/base-url';

const INTERCEPTOR: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: TokenInterceptor
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    PostsModule,
    AuthModule,
    LoaderModule,
    CabinetModule,
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    INTERCEPTOR,
    {
      provide: API_BASE_URL,
      useValue: environment.apiRoot
    },
  ]
})
export class AppModule { }
