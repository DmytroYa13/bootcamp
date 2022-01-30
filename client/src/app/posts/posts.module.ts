import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PostItemComponent } from './components/post-item/post-item.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostsService } from './services/posts.service';
import { PostsFakeService } from './services/posts-fake.service';
import { PostFormComponent } from './components/post-form/post-form.component';
import { SharedModule } from '../shared/shared-module.module';
import { PostPageComponent } from './components/post-page/post-page.component';
import { RouterModule, Routes } from '@angular/router';
import { PostsLayoutComponent } from './components/posts-layout/posts-layout.component';
import { TagsModule } from '../tags/tags.module';
import { LikesService } from './services/likes.service';
import { LoaderModule } from '../loader/loader.module';

const components = [PostsLayoutComponent, PostItemComponent, PostListComponent, PostFormComponent];

const routes: Routes = [

  { path: '', component: PostsLayoutComponent },

  { path: '', redirectTo: '/', pathMatch: 'full' },

  { path: 'post/new', component: PostFormComponent },

  { path: 'post/:id', component: PostPageComponent }

];

@NgModule({
  declarations: [...components, PostPageComponent],
  exports: [...components],
  imports: [
    CommonModule,
    SharedModule,
    LoaderModule,
    TagsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    PostsService,
    LikesService,
    // to use fakeService
    // { provide: PostsService, useClass: PostsFakeService }
  ],
})
export class PostsModule { }
