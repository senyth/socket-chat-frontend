/**
 * Name:          Authentication Interceptor Class
 * Description:   Includes a token every time the app sends a request to the API and checks for errors
 * Developer:     Babie Entoma
 * Date:          06/29/2019
 */

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()

export class Interceptor implements HttpInterceptor {

  constructor(
      private auth: AuthService,
      public router: Router
    ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const headersConfig = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
        };

    const token = this.auth.getToken();

    if (token) {
        headersConfig['Authorization'] =  `Bearer ${token}`;
    }

    request = request.clone({ setHeaders: headersConfig });

    return next.handle(request)
        .pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                // successful request
                }
            }, (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    switch (err.status) {
                        case 401: {
                            if (this.router.url !== '/login') {
                                // unauthorized
                                console.log('Unauthorized access. Go back to login page.');
                                this.router.navigate(['/login']);
                            }
                            break;
                        }
                        case 403: {
                            // expired token
                            console.log('Forbidden. Expired token. Go back to login page.');
                            this.router.navigate(['/login']);
                            break;
                        }
                    }
                }
            })
        );

  }
}
