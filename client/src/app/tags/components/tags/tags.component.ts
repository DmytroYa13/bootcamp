import { Component, Input } from '@angular/core';

import { Tag } from 'src/app/shared/interfaces/tags.interface';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent {

  @Input() tags: Tag[] = [];

  constructor() { }

  onSelect(tag: Tag) {
    console.log(tag);
  }

}
