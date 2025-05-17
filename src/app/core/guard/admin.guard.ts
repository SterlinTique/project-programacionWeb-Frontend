import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '@core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
// Esto es como un guardia para proteger las rutas protegidas, en este caso para las del administrador 
export class AdminGuard implements CanActivate {
    // Se define la clase
    constructor(private readonly _authService: AuthService, private readonly _router: Router) {}

    canActivate( // Función que determina si el usuario logueado puede acceder a la ruta
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const userSession = this._authService.getAuthFromSessionStorage(); // Obtiene toda la informacion de Usuario loguado (Token(id, name, gmail, etc..))
            console.log(userSession);
            
        if (userSession && userSession.rol_id === 1) { // Verfica si es administrador para poder darle acceso
            return true;
        } else {
            this._router.navigate(['/authentication/page404']); // Si no lo es, lo redirige ya sea al login o en este caso a un page404
            return false;
        }
    }
}