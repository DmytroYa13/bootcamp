import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthorService } from '../cabinet/services/author.service';
import { AUTHOR_DEFAULT_AVATAR_TOKEN } from '../shared/InjectionTokens/author-default-avatar';
import { CurrentAuthor } from '../shared/interfaces/current-author.type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  author$: Observable<CurrentAuthor>;

  constructor(
    authorService: AuthorService,
    @Inject(AUTHOR_DEFAULT_AVATAR_TOKEN)
    public authorDefaultAvatar: string,
  ){
    this.author$ = authorService.getAuthor();
  }

 }
