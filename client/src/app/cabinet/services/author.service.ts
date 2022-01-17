import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { API_BASE_URL } from 'src/app/shared/InjectionTokens/base-url';
import { Author } from 'src/app/shared/interfaces/author.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private apiUrl: string;
  private author$ = new Subject<Author>();

  constructor(
    private http: HttpClient,
    @Optional() @Inject(API_BASE_URL) apiUrl?: string
  ) {
    this.apiUrl = apiUrl ? `${apiUrl}/author` : '';
  }

  getAuthorData(): void {
    this.http.get<Author>(`${this.apiUrl}`).subscribe({
      next: (author) => this.author$.next(author),
      error: (err) => console.log(err)
    });
  }

  getAuthor(): Observable<Author> {
    return this.author$.asObservable();
  }



}
