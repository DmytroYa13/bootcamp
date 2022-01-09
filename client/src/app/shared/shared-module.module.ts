import { NgModule } from '@angular/core';

// angular material
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// components
import { LoaderComponent } from './components/loader/loader.component';

const materialModules  = [
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatIconModule,
  MatSidenavModule,
  MatSelectModule,
  MatProgressSpinnerModule
];

@NgModule({
  declarations: [
    LoaderComponent
  ],
  imports: [...materialModules],
  exports: [...materialModules, LoaderComponent]
})
export class SharedModule { }
