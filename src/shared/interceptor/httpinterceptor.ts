import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";

@Injectable()
export class httpinterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req);
    const clonedRequest = req.clone({
        url: ''
    });

    // Manejo de errores
    return next.handle(clonedRequest).pipe(
      catchError((error) => {
        console.error('Error en la solicitud:', error);
        throw error;
      })
    );
  }
}