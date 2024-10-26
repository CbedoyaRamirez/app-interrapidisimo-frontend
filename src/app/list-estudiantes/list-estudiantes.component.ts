import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultEstudianteService } from 'src/services/consultEstudiante.services';
import { ConsultMateriaService } from 'src/services/consultMaterias.services';
import { ConsultProfesoresService } from 'src/services/consultProfesor.services';
import { UtilService } from 'src/services/util.services';
import { Estudiante } from 'src/shared/interfaces/IEstudiante';
import { Materia } from 'src/shared/interfaces/IMateria';
import { Profesor } from 'src/shared/interfaces/IProfesor';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-list-estudiantes',
  templateUrl: './list-estudiantes.component.html',
  styleUrls: ['./list-estudiantes.component.scss']
})
export class ListEstudiantesComponent implements OnInit {

  listaMateriasEstudiante: Estudiante[];
  listMaterias: Materia[];
  listProfesores: Profesor[];
  loading: boolean = false;
  cedula: string;
  name: string;

  constructor(private consultMateriaService: ConsultMateriaService,
    private consultProfesoresService: ConsultProfesoresService,
    private consultEstudianteService: ConsultEstudianteService,
    private router: Router,
    private route: ActivatedRoute,
    private utilService: UtilService) { 
      this.route.paramMap.subscribe(params => {
        this.cedula = String(params.get('cedula'));
        this.name = String(params.get('name'));
      });
    }

  ngOnInit(): void {
    this.utilService.setGlobalLoadind(true);
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

  getMateriasEstudiante(){
    this.consultEstudianteService.getEstudiante().subscribe({
      next: (data) => {
        this.listaMateriasEstudiante = data;
        this.loading = true;
        this.utilService.setGlobalLoadind(false);
      },
      error: (error) => {
        Swal.fire({
          icon: "error",
          text: "No tiene materias asignadas",
        });
      }
    })
  }


  getProfesores() {
    this.consultProfesoresService.getProfesores().subscribe({
      next: (data) => {
        this.listProfesores = data;
        this. getMateriasEstudiante();
      },
      error: (error) => {
        Swal.fire({
          icon: "error",
          text: "Error consultando los profesores",
        });
      }
    })
  }

  getNombreMateria(id: number){
    return this.listMaterias.find(mat => mat.id === id)?.nombre;
  }

  getNombreProfesor(id: number){
    return this.listProfesores.find(mat => mat.id === id)?.nombres;
  }

  exit() {
    this.router.navigate(['']);
  }

}
