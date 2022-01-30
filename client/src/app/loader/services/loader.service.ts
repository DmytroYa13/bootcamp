import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private currentApiRequests = new BehaviorSubject<string[]>([]);

  constructor() { }

  show(apiRequestName: string) {
    this.currentApiRequests.next([...this.currentApiRequests.getValue(), apiRequestName]);
  }

  hide(apiRequestName: string) {
    const apiRequests: string[] = this.currentApiRequests.getValue();
    apiRequests.forEach((item, index) => {
      if (item === apiRequestName) { apiRequests.splice(index, 1); }
    });
    this.currentApiRequests.next(apiRequests);
  }

  getLoader(loaderName: string) {
    return this.currentApiRequests.asObservable().pipe(
      map(items => !!items.includes(loaderName))
    );
  }
}
