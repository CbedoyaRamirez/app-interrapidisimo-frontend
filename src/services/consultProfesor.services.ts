import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profesor } from 'src/shared/IProfesor';

@Injectable({
  providedIn: 'root'
})
export class ConsultProfesoresService {

  constructor(private http: HttpClient) { }
  
  getProfesores(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>('http://localhost:8080/api/profesores');
  }
  
}
