import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profesor } from 'src/shared/interfaces/IProfesor';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultProfesoresService {

  constructor(private http: HttpClient) { }
  
  getProfesores(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(`api/profesores`);
  }
  
}
