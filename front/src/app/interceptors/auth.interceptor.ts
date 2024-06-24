import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Injectable } from "@angular/core";


@Injectable()
export class authInterceptor implements HttpInterceptor {
   constructor (private authService: AuthService) {
    
   }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.authService.user != null && this.authService.user.token != null ) {
      let newRequest = req.clone({
        headers: req.headers.append("auth", this.authService.user.token)
      })
    
      return next.handle(newRequest);
    }

    return next.handle(req);
  }
 }
