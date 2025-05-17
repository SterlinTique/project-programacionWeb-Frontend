import { HttpClient, HttpParams } from '@angular/common/http'; // Importa el cliente HTTP para enviar peticiones al servidor
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '@core/models/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Indica que este servicio se puede inyectar en cualquier parte del proyecto
})
export class UsersService {

  urlBaseServices: string = URL_SERVICIOS; // URL base de los servicios

  constructor(private readonly http: HttpClient) { }

  // En este archivo estan creadas la conexiones con las APIs de usuarios de la parte del servidor

  //Crea un nuevo usuario
  createUser(userData: any): Observable<any> { 
    const endpoint = `${this.urlBaseServices}/api/v1/users/create`; // ruta del endpoint
    return this.http.post<any>(endpoint, userData); // Observable con la respuesta de la API
  }

  // Actualiza un usuario existente
  updateUser(userId: number, userData: any): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/users/update/${userId}`; // ruta del endpoint, en este caso tambien el ID del usuario
    return this.http.put<any>(endpoint, userData);
  }

  // Elimina un usuario
  deleteUser(userId: number): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/users/delete/${userId}`;
    return this.http.delete<any>(endpoint);
  }

  // Obtiene una lista de usuarios que están relacionados con un administrador
  getAllUserByAdministrator(filters?: any): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/users`;
    const params = new HttpParams({ fromObject: {
      //Filtros para la búsqueda.
      nombre: filters?.name || '',
      email: filters?.email || ''
    } });
    return this.http.get<any>(endpoint, { params }); // retorna el observable con la lista de usuarios
  }

  // Obtiene una lista de todos los administradores
  getAllAdministrator(): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/users/rol/1`;
    return this.http.get<any>(endpoint);
  }

  // Obtiene una lista de todos los usuarios
  getAllUsers(): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/users/rol/2`;
    return this.http.get<any>(endpoint);
  }
  
}
