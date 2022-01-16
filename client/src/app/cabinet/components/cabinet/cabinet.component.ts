import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AUTHOR_DEFAULT_AVATAR_TOKEN } from 'src/app/shared/InjectionTokens/author-default-avatar';
import { Author } from 'src/app/shared/interfaces/author.interface';
import { AuthorService } from '../../services/author.service';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent implements OnInit {

  author$: Observable<Author>;

  constructor(
    private authorService: AuthorService,
    @Inject(AUTHOR_DEFAULT_AVATAR_TOKEN)
    public authorDefaultAvatar: string,
  ) { }

  ngOnInit(): void {
    this.author$ = this.authorService.getAuthor();
  }

}
