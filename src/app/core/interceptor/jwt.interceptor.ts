import { Injectable } from '@angular/core'; // Injectable de angular 
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http'; // Para poder trabajar con peticiones HTTP y interceptores
import { Observable } from 'rxjs'; 
import { AuthService } from '../service/auth.service'; // Importar el servicio de autenticación

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private readonly authenticationService: AuthService) {}
// Metodo para interceptar cada petición HTTP y agregar el token JWT 
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {  
    const token = sessionStorage.getItem('accessToken');// Obtiene el token de la sesión inciada en ese momento

    if (token) { // validacion donde se clona la solicituda para colocarle un encabezado con el token a cada petición, se debe clonar para poderla modificar ya que el token es inmutable
      req = req.clone({ 
        setHeaders: { // Agrega el encabezado de autorización con el token JWt
          Authorization: `Bearer ${token}` 
        }
      });
    }

    return next.handle(req);// Continua con la petición modificada
  }
}

// Garantiza que se agregue el token JWT a todas las peticiones, continua la peticion si todo esta bien