import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { PostsLayoutComponent } from './shared/components/posts-layout/posts-layout.component';
import { HeaderComponent } from './header/header.component';
import { TagsComponent } from './tags/tags.component';
import { PostsModule } from './posts/posts.module';
import { SharedModule } from './shared/shared-module.module';

@NgModule({
  declarations: [
    AppComponent,
    PostsLayoutComponent,
    HeaderComponent,
    TagsComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    PostsModule,
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
