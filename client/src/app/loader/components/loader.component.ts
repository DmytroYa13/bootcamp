import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `<div><mat-spinner [diameter]="diameter"></mat-spinner></div>`,
  styles: [`
    div {
      display: flex;
      justify-content: center;
      margin: 0 15px;
    }
  `]
})
export class LoaderComponent {
  @Input() diameter: string = "40";
}
