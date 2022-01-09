import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Tag } from 'src/app/shared/interfaces/tags.interface';
import { TagsService } from 'src/app/tags/services/tags.service';

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.scss']
})
export class TagsListComponent implements OnInit {

  tags: Observable<Tag[]>;

  constructor(
    private tagsService: TagsService
  ) { }

  ngOnInit(): void {
    this.tags = this.tagsService.getAll();
  }

  onSelect(tag: Tag): void{
    console.log(tag);
  }

}
