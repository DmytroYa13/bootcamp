import { NgModule } from '@angular/core';

// angular material
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';


const materialModules = [
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatIconModule,
  MatSidenavModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatChipsModule
];

@NgModule({
  declarations: [],
  imports: [...materialModules],
  exports: [...materialModules]
})
export class SharedModule { }
