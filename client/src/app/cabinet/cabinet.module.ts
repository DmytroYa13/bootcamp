import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabinetComponent } from './components/cabinet/cabinet.component';
import { SharedModule } from '../shared/shared-module.module';
import { LoaderModule } from '../loader/loader.module';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ImageCropperModule } from 'ngx-image-cropper';

const routes: Routes = [

  { path: 'cabinet', component: CabinetComponent }

];

@NgModule({
  declarations: [
    CabinetComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LoaderModule,
    ImageCropperModule,
    RouterModule.forChild(routes),
    HttpClientModule
  ]
})
export class CabinetModule { }
