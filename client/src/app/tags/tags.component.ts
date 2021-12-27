import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag } from '../shared/interfaces/tags.interface';
import { TagsService } from '../shared/services/tags.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  tags: Observable<Tag[]>

  constructor(
    private tagsService: TagsService
  ) { }

  ngOnInit(): void {
    this.tags = this.tagsService.getAll()
  }

  onSelect(tag: Tag): void{
    console.log(tag);
  }

}
