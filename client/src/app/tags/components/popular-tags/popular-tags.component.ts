import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Loader } from 'src/app/loader/enums/loaders.enum';
import { LoaderService } from 'src/app/loader/services/loader.service';
import { Tag } from 'src/app/shared/interfaces/tags.interface';
import { TagsService } from 'src/app/tags/services/tags.service';

@Component({
  selector: 'app-popular-tags',
  templateUrl: './popular-tags.component.html',
  styleUrls: ['./popular-tags.component.scss']
})
export class PopularTagsComponent implements OnInit {

  tags: Observable<Tag[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private tagsService: TagsService,
    public loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.loaderService.getLoader(Loader.Tags);
    this.tags = this.tagsService.getAll();
  }

}
