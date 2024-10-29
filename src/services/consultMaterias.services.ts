import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Materia } from 'src/shared/interfaces/IMateria';
import { CONSULTAMATERIAS } from 'src/shared/endpoint';

@Injectable({
  providedIn: 'root'
})
export class ConsultMateriaService {

  constructor(private http: HttpClient) { }

  getMaterias(): Observable<Materia[]> {
    return this.http.get<Materia[]>(CONSULTAMATERIAS);
  }

  updateMateria(item: Materia) {
    return this.http.put<Materia[]>(`${CONSULTAMATERIAS}/${item.id}`, item);
  }

}
