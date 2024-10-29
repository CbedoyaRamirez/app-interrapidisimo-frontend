export interface Estudiante {
  id?: number,
  cedula: string,
  nombre: string,
  materia_Id: number,
  profesor_Id: number
}

export interface EstudianteCompartidos {
  nombreEstudiante: string,
  nombreMateria: string,
}