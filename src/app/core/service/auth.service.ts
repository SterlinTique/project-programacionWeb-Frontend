import { HttpClient } from '@angular/common/http'; // Cliente HTTP para poder enviar peticiones al servidor
import { Injectable } from '@angular/core'; // El decorador Injectable para que este servicio se pueda usar en otro lado del pryecto
import { Router } from '@angular/router';// Enrutador para redirigir 
import { URL_SERVICIOS } from '@core/models/config';
import * as jwt from "jwt-decode"; // Para decodificar el token 
import { BehaviorSubject, Observable } from 'rxjs'; // Para manejar observables
import { ROLES } from '@core/models/enums';
import { User } from '@core/models/user';


@Injectable({
  providedIn: 'root',// Indica que este servicio se puede inyectar en cualquier parte del proyecto
})
export class AuthService {

  urlBaseServices: string = URL_SERVICIOS; // URL base de los servicios

// obtiene el valor actual de usuario conectado 
  public get currentUserValue(): User {  // currentUser representa al usuario actualmente conectado en la aplicación
    return this.currentUserSubject.value;
  }

  private readonly currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>; // Observable del usuario logueado


  constructor( private readonly http: HttpClient,private readonly router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(sessionStorage.getItem('currentUser') || '{}')
    );

    this.currentUser = this.currentUserSubject.asObservable();
  }
// Envía una petición POST al servidor para autenticar al usuario.
  login(email: string, password: string): Observable<any> { // Observable con la respuesta del servidor
    const endpoint = `${this.urlBaseServices}/api/v1/auth/login`; // URL del endpoint de autenticación
    return this.http.post<any>(endpoint, { email, password }); // Envía la petición POST al servidor con el email y la contraseña
  }

  // Verifica si el usuario está autenticado
  isAuthenticated(): boolean {
    const accessToken = sessionStorage.getItem('accessToken'); // Obtiene el token de acceso almacenado en la sesión
    return accessToken !== null; // Verifica si el token es nulo o no
  }

  // Obtiene la información del usuario mediante el token de acceso
  getAuthFromSessionStorage(): any {
    // manejo de Try y Catch para manejo de errores
    try {
      const lsValue = sessionStorage.getItem('accessToken');  // Obtiene el token de la sesión activa
      if (!lsValue) { // verifica si el nulo
        return undefined;
      }
      const decodedToken: any = jwt.jwtDecode(lsValue); // Decodifica el token de acceso

      return decodedToken;  // Devuelve la info del usuario
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  // Almacena un token en la sesión
  setToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  // Obtiene el token almacenado en la sesión
  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  // Verifica si el usuario logueado tiene el rol de administrador
  isAdminLogged(){
    const userInfo = this.getAuthFromSessionStorage();
    return userInfo.rol_id === ROLES.ADMIN; // Compara el rol del user loguado con 1 
  }

  // Verifica si el usuario conectado tiene el rol de usuario
  isUserLogged() {
    const userInfo = this.getAuthFromSessionStorage();
    return userInfo.rol_id === ROLES.USER; // Compara el rol del user loguado con 2
  }

  getTokenFromSessionStorage(): string | null {
    const isValue = sessionStorage.getItem('accessToken');
    return isValue;
  } 

  // Cierra la sesión del usuario y redirige a la página de inicio de sesión
  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/authentication/signin'], { // Redirige al usuario a la página de inicio de sesión
      queryParams: {},
    });
  }

}
