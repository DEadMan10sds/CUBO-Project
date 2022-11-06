import { HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JWTInterceptor implements HttpInterceptor {
  intercept(req, next) {
    if (req.headers.get('skipsolicitude')) {
      return next.handle(req);
    }
    const tokenizedRequest = req.clone({
      setHeaders: {
        xToken: localStorage.getItem('authToken'),
      },
    });
    return next.handle(tokenizedRequest);
  }
}
