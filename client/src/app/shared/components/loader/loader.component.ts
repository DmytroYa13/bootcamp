import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `<div><mat-spinner></mat-spinner></div>`,
  styles: [`
    div {
      display: flex;
      justify-content: center;
    }
  `]
})
export class LoaderComponent {}
