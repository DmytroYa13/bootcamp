import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { PostsLayoutComponent } from './shared/components/posts-layout/posts-layout.component';
import { HeaderComponent } from './header/header.component';
import { TagsComponent } from './tags/tags.component';
import { PostsModule } from './posts/posts.module';
import { MaterialModule } from './shared/modules/material-module/material-module.module';
@NgModule({
  declarations: [
    AppComponent,
    PostsLayoutComponent,
    HeaderComponent,
    TagsComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    PostsModule,
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
