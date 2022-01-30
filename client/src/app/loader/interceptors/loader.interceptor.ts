import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { finalize, Observable } from "rxjs";
import { LoaderService } from "../services/loader.service";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private loader: LoaderService) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

    // reads request url to define which request is calling right now
    // than replace id in url ("posts/61dc8a6a7556c98137221b18") to just "id" to create generel name of request ("posts/id")
    // and pass it into BehaviorSubject. In the component I subscribe for BehaviorSubject
    // and show loader when request is calling.
    // It allows to show different loader for different calls in different places

    const urlReg = new RegExp(/([0-9]+([a-zA-Z]+[0-9]+)+)/);

    let URN = request.urlWithParams.split('/api/');
    let apiName = URN[1].replace(urlReg, 'id');

    this.loader.show(apiName);
    return next.handle(request).pipe(
      finalize(() => {
        this.loader.hide(apiName);
      })
    );
  }
}
