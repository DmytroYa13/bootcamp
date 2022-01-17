import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API_BASE_URL } from 'src/app/shared/InjectionTokens/base-url';
import { Tag, TagData } from '../../shared/interfaces/tags.interface';

@Injectable()
export class TagsService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    @Optional() @Inject(API_BASE_URL) apiUrl?: string
  ) {
    this.apiUrl = apiUrl ? `${apiUrl}/tags` : '';
  }

  getAll(): Observable<Tag[]> {
    return this.http.get<TagData[]>(this.apiUrl).pipe(
      map(data => {
        return data.map((item) => item._id as Tag);
      })
    );;
  }

  create(tag: Tag): Observable<Tag> {
    return this.http.post<Tag>(this.apiUrl, tag);
  }

}
