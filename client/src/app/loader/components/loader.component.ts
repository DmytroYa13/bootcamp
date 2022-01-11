import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `<div><mat-spinner [diameter]="diameter"></mat-spinner></div>`,
  styles: [`
    div {
      display: flex;
      justify-content: center;
    }
  `]
})
export class LoaderComponent {
  @Input() diameter: string = "40";
}
