import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsListComponent } from './components/tags-list/tags-list.component';
import { SharedModule } from '../shared/shared-module.module';
import { TagsService } from './services/tags.service';
import { LoaderModule } from '../loader/loader.module';
import { TagsForPostComponent } from './components/tags-for-post/tags-for-post.component';

const components = [TagsListComponent, TagsForPostComponent];

@NgModule({
  declarations: [...components],
  exports: [...components],
  imports: [
    CommonModule,
    SharedModule,
    LoaderModule
  ],
  providers: [TagsService]
})
export class TagsModule { }
