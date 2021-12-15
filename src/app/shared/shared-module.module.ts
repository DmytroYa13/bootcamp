import { NgModule } from '@angular/core';

// angular material
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

const materialModules  = [
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatIconModule,
  MatSidenavModule
]

@NgModule({
  declarations: [],
  imports: [...materialModules],
  exports: [...materialModules]
})
export class SharedModule { }
