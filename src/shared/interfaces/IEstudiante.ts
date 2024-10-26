export interface Estudiante {
  id?: number,
  cedula: number,
  nombre: string,
  materia_id: number,
  profesor_id: number
}

export interface EstudianteCompartidos {
  name: string,
  materia: string,
}