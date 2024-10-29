import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estudiante, EstudianteCompartidos } from 'src/shared/interfaces/IEstudiante';
import { ADDESTUDIANTES, CONSULTAESTUDIANTES } from 'src/shared/endpoint';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultEstudianteService {

  constructor(private http: HttpClient) { }
  
  getEstudiante(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(CONSULTAESTUDIANTES);
  }

  postEstudiante(estudiante: Estudiante): Observable<any> {
    return this.http.post<any>(ADDESTUDIANTES, estudiante);
  }  

  deleteMateriaEstudiante(id: number): Observable<any> {
    return this.http.delete<any>(`${CONSULTAESTUDIANTES}/${id}`);
  }  

  getCompañerosMateriaEstudiante(cedula: number): Observable<EstudianteCompartidos[]> {
    return this.http.get<EstudianteCompartidos[]>(`${CONSULTAESTUDIANTES}/${cedula}`);
  }    
  
}
