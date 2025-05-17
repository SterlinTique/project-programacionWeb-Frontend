import { AuthService } from '../service/auth.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http'; // importar todas la clases necesarias para tomar los http
import { Observable, throwError } from 'rxjs'; // observar las secuencias de eventos
import { catchError } from 'rxjs/operators';

@Injectable() // siempre comenzamos con una clase
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService) {}

  intercept(
    request: HttpRequest<any>, // solicitud http
    next: HttpHandler // comunicacion con el backend
  ): Observable<HttpEvent<any>> { // retorna un observable de tipo httpEvent
    return next.handle(request).pipe( // permite que la solicitud continue
      catchError((err) => { // si llega a ver un error se encapsula
        if (err.status === 401) { //401 de tipo no autorizado
          // auto logout if 401 response returned from api
          this.authenticationService.logout();
          location.reload(); // Recargar la pagina para forzar al usuario de volver al logout
        }

        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}


// Para interceptar cualquier error de todas las solicitudes que se lanzen en angular