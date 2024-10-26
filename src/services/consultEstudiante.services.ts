import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estudiante, EstudianteCompartidos } from 'src/shared/interfaces/IEstudiante';
import { CONSULTAESTUDIANTES } from 'src/shared/endpoint';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultEstudianteService {

  constructor(private http: HttpClient) { }
  
  getEstudiante(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(`api/estudiante`);
  }

  postEstudiante(estudiante: Estudiante): Observable<any> {
    return this.http.post<any>(`api/estudiante/add`, estudiante);
  }  

  deleteMateriaEstudiante(id: number): Observable<any> {
    return this.http.delete<any>(`api/estudiante/${id}`);
  }  

  getCompañerosMateriaEstudiante(cedula: number): Observable<EstudianteCompartidos[]> {
    return this.http.get<EstudianteCompartidos[]>(`api/estudiante/companeros?cedula=${cedula}`);
  }    
  
}
