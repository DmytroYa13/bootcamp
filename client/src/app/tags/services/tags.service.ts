import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Tag, TagData } from '../../shared/interfaces/tags.interface';

@Injectable()
export class TagsService {

  private apiUrl: string = '/api/tags';

  constructor(private http: HttpClient) { }

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
