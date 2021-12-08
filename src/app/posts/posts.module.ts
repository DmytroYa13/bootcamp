import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostItemComponent } from './components/post-item/post-item.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostsService } from './services/posts.service';
import { PostsFakeService } from './services/posts-fake.service';
import { PostFormComponent } from './post-form/post-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const components = [PostItemComponent, PostListComponent, PostFormComponent]

@NgModule({
  declarations: [...components],
  exports: [...components],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: PostsService, useClass: PostsFakeService }
  ],
})
export class PostsModule { }
