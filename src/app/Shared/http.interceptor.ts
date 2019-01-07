import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatCalendarBody } from '@angular/material';
  
  /** Pass untouched request through to the next request handler. */
  @Injectable()
  export class HeaderInterceptor implements HttpInterceptor {    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //Only interupt the request if it does not has a proper header
        if(req.headers.get('Authorization') == null) {
            //Assumes that the local storage has the proper jwt.  If not examine workflow of other checks
            const authToken = `Bearer ${localStorage.getItem("jwt")}`;

            const authReq = req.clone({
            headers: req.headers.set('Authorization', authToken)
            });
        
            return next.handle(authReq);
        }
    }
  }