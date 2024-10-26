import { Profesor } from "./IProfesor";

export interface Materia {
  id: number;
  nombre: string;
  creditos: number;
  checked: boolean;
  profesores: Profesor[];
  showDetails: boolean;
}


export interface MateriaElejida {
  id: number;
  nombre: string;
  creditos: number;
  checked: boolean;
  profesor: string;
  profesorID: number;
  showDetails: boolean;
}