import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { AuthorService } from './cabinet/services/author.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'bootcamp';

  constructor(
    private authService: AuthService,
    private authorService: AuthorService,

  ) { }

  ngOnInit(): void {
    this.authService.checkIsTokenExist();
    this.authorService.getAuthorData();
  }

}
