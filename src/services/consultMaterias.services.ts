import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Materia } from 'src/shared/interfaces/IMateria';

@Injectable({
  providedIn: 'root'
})
export class ConsultMateriaService {

  constructor(private http: HttpClient) { }
  
  getMaterias(): Observable<Materia[]> {
    return this.http.get<Materia[]>("api/materias");
  }
  
}
