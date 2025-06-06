import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '@core/models/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  urlBaseServices: string = URL_SERVICIOS;

  constructor(private readonly http: HttpClient) { }

  // Crea un nuevo proyecto
  createProject(projectData: any): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/projects/create`;
    return this.http.post<any>(endpoint, projectData);
  }

  // Actualiza un proyecto
  updateProject(projectId: number, projectData: any): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/projects/update/${projectId}`;
    return this.http.put<any>(endpoint, projectData);
  }

  // Obtiene todos los proyectos
  getAllProjects(): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/projects/`;
    return this.http.get<any>(endpoint);
  }

  // Obtiene un proyecto por ID
  getProjectsByUserId(userId: number): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/projects/${userId}`;
    return this.http.get<any>(endpoint);
  }

  // Elimina un proyecto
  deleteProject(projectId: number): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/projects/delete/${projectId}`;
    return this.http.delete<any>(endpoint);
  }

  // Asocia usuarios a un proyecto
  assingUsersToProject(data: any): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/projects/associate`;
    return this.http.post<any>(endpoint, data);
  }

  // Desasocia un usuario de un proyecto
  removeUserFromProject(data: any): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/projects/disassociate`;
    return this.http.request('delete', endpoint, { body: data });
  }

}