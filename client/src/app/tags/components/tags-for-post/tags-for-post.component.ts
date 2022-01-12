import { Component, Input, OnInit } from '@angular/core';
import { Tag } from 'src/app/shared/interfaces/tags.interface';

@Component({
  selector: 'app-tags-for-post',
  templateUrl: './tags-for-post.component.html',
  styleUrls: ['./tags-for-post.component.scss']
})
export class TagsForPostComponent {

  @Input() tags: Tag[] = [];

  constructor() { }

  onSelect(tag: Tag) {

  }

}
