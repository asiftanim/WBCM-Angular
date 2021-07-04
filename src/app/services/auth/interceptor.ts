import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { AppAuthService } from './auth.service';

@Injectable()
export class BossInterceptor implements HttpInterceptor {
  constructor(private appAuthService: AppAuthService) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const requestMod = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.appAuthService.getJWTToken()}`
      }
    });
    return next.handle(requestMod);
  }
}
