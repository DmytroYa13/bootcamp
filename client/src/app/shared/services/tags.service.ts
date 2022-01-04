import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag } from '../interfaces/tags.interface';


@Injectable({
  providedIn: 'root'
})
export class TagsService {

  private apiUrl: string = '/api/tags'

  constructor(private http: HttpClient) { }

  getAll(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.apiUrl)
  }

  create(tag: Tag): Observable<Tag> {
    return this.http.post<Tag>(this.apiUrl, tag)
  }

}
