import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Author } from 'src/app/shared/interfaces/author.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private apiUrl: string = '/api/author';
  private author$ = new Subject<Author>();

  constructor(
    private http: HttpClient
  ) { }

  getAuthorData(): void {
    this.http.get<Author>(`${this.apiUrl}`).subscribe({
      next: (author) => this.author$.next(author),
      error: (err) => console.log(err)
    });
  }

  getAuthor():Observable<Author> {
    return this.author$.asObservable();
  }



}
