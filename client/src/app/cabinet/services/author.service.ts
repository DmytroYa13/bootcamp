import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { API_BASE_URL } from 'src/app/shared/InjectionTokens/base-url';
import { Author } from 'src/app/shared/interfaces/author.interface';
import { CurrentAuthor } from 'src/app/shared/interfaces/current-author.type';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private apiUrl: string;
  private author$ = new BehaviorSubject<CurrentAuthor>(null);

  constructor(
    private http: HttpClient,
    @Optional() @Inject(API_BASE_URL) apiUrl?: string
  ) {
    this.apiUrl = apiUrl ? `${apiUrl}/author` : '';
  }

  getAuthorData(): void {
    this.http.get<Author>(`${this.apiUrl}`).subscribe(author => this.author$.next(author));
  }

  getAuthor(): Observable<CurrentAuthor> {
    return this.author$.asObservable();
  }

  update(id: string, data: Partial<Author>, image?: File): Observable<CurrentAuthor> { // TODO: change after adding imh on backEnd
    const formData = new FormData();
    if (image) {
      formData.append('image', image, image.name);
    }

    return this.http.patch<CurrentAuthor>(`${this.apiUrl}/${id}`, formData);
  }

}
