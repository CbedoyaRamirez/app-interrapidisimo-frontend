import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CONSULTAMATERIAS } from 'src/shared/endpoint';
import { Materia } from 'src/shared/IMateria';

@Injectable({
  providedIn: 'root'
})
export class ConsultMateriaService {

  constructor(private http: HttpClient) { }
  
  getMaterias(): Observable<Materia[]> {
    return this.http.get<Materia[]>('http://localhost:8080/api/materias');
  }
  
}
