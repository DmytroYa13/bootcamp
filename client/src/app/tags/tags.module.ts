import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopularTagsComponent } from './components/popular-tags/popular-tags.component';
import { SharedModule } from '../shared/shared-module.module';
import { TagsService } from './services/tags.service';
import { LoaderModule } from '../loader/loader.module';
import { TagsComponent } from './components/tags/tags.component';

const components = [PopularTagsComponent, TagsComponent];

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
