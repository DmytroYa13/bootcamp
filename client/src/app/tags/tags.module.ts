import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsListComponent } from './components/tags-list/tags-list.component';
import { SharedModule } from '../shared/shared-module.module';
import { TagsService } from './services/tags.service';

const components = [TagsListComponent]

@NgModule({
  declarations: [...components],
  exports: [...components],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [TagsService]
})
export class TagsModule { }
