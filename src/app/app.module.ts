import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { PostsLayoutComponent } from './shared/components/posts-layout/posts-layout.component';
import { HeaderComponent } from './header/header.component';
import { TagsComponent } from './tags/tags.component';
import { PostsService } from './shared/services/posts.service';
import { PostsFakeService } from './shared/services/posts-fake.service';
import { PostFormComponent } from './post-form/post-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PostsComponent,
    PostsLayoutComponent,
    HeaderComponent,
    TagsComponent,
    PostFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [

    { provide: PostsService, useClass: PostsFakeService }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
