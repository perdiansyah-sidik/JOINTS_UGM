import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('ecoapp_token');
    if (!token || !request.url.startsWith(`${environment.apiUrl}/`)) return next.handle(request);
    return next.handle(request.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));
  }
}
