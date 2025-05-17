import { Injectable } from '@angular/core'; // decorador de angular, para inyectarlos en otras partes del proyecto
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
// Esto es como un guardia para proteger las rutas
export class AuthGuard  {
  constructor(private readonly authService: AuthService) {}
  // Se activa cuando alguien va a acceder a rutas protegidas
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.isAuthenticated();// Verificar si el usuario esta logueado
    if (currentUser) { // Si lo esta todo sigue normal
      return true;
    }

    // // not logged in so redirect to login page with the return url
    this.authService.logout(); // Si no, lo redirecciona al login y borra los registros del token anterior
    return false;
  }
}
