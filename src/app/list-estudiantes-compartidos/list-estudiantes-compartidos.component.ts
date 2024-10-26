import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultEstudianteService } from 'src/services/consultEstudiante.services';
import { ConsultMateriaService } from 'src/services/consultMaterias.services';
import { ConsultProfesoresService } from 'src/services/consultProfesor.services';
import { Estudiante, EstudianteCompartidos } from 'src/shared/interfaces/IEstudiante';
import { Materia } from 'src/shared/interfaces/IMateria';
import { Profesor } from 'src/shared/interfaces/IProfesor';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-list-estudiantes-compartidos',
  templateUrl: './list-estudiantes-compartidos.component.html',
  styleUrls: ['./list-estudiantes-compartidos.component.scss']
})
export class ListEstudiantesCompartidosComponent implements OnInit {

  listaMateriasEstudiante: EstudianteCompartidos[];
  listMaterias: Materia[];
  listProfesores: Profesor[];
  loading: boolean = false;
  cedula: string;

  constructor(private consultMateriaService: ConsultMateriaService,
    private consultProfesoresService: ConsultProfesoresService,
    private consultEstudianteService: ConsultEstudianteService,
    private route: ActivatedRoute,
    private router: Router) {
    this.route.paramMap.subscribe(params => {
      this.cedula = String(params.get('cedula'));
    });
  }

  ngOnInit(): void {
    this.getMaterias();
  }

  getMaterias() {
    this.consultMateriaService.getMaterias().subscribe({
      next: (data) => {
        this.listMaterias = data;
        this.getProfesores();
      },
      error: (error) => {
        Swal.fire({
          icon: "error",
          text: "Error consultando las materias",
        });
      }
    })
  }

  getMateriasEstudiante() {
    this.listaMateriasEstudiante = [];
    this.consultEstudianteService.getCompañerosMateriaEstudiante(Number(this.cedula)).subscribe({
      next: (data) => {
        for (let index = 0; index < data.length; index++) {
          const element = JSON.stringify(data[index]);
          const arrayIndex = element.split(",");
          this.listaMateriasEstudiante.push(
            {
              name: this.replacesValues(element.split(",")[0]),
              materia: this.replacesValues(element.split(",")[1]),
            }
          )
        }
        this.loading = true;
      },
      error: (error) => {
        Swal.fire({
          icon: "error",
          text: "No tiene materias asignadas",
        });
      }
    })
  }

  replacesValues(cadena: string){
    return cadena.replace("[", "").replace("'", "").replace("]","");
  }

  getProfesores() {
    this.consultProfesoresService.getProfesores().subscribe({
      next: (data) => {
        this.listProfesores = data;
        this.getMateriasEstudiante();
      },
      error: (error) => {
        Swal.fire({
          icon: "error",
          text: "Error consultando los profesores",
        });
      }
    })
  }

  getNombreMateria(id: number) {
    return this.listMaterias.find(mat => mat.id === id)?.nombre;
  }

  getNombreProfesor(id: number) {
    return this.listProfesores.find(mat => mat.id === id)?.nombres;
  }

  exit() {
    this.router.navigate(['']);
  }
}
