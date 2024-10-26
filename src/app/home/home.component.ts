import { Component, OnInit } from '@angular/core';
import { ConsultMateriaService } from 'src/services/consultMaterias.services';
import { ConsultProfesoresService } from 'src/services/consultProfesor.services';
import { Materia } from 'src/shared/IMateria';
import { Profesor } from 'src/shared/IProfesor';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  listMaterias: Materia[];
  listMateriasProfesores: Profesor[];
  listProfesores: Profesor[];
  isChecked: boolean = false;

  constructor(private consultMateriaService: ConsultMateriaService,
    private consultProfesoresService: ConsultProfesoresService
  ) { }

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

  getProfesores() {
    this.consultProfesoresService.getProfesores().subscribe({
      next: (data) => {
        this.listProfesores = data;
        this.complementData(this.listMaterias);
      },
      error: (error) => {
        Swal.fire({
          icon: "error",
          text: "Error consultando los profesores",
        });
      }
    })
  }

  complementData(listMaterias: Materia[]) {
    listMaterias.map(mat => {
      let profes = this.listProfesores.filter(prof => prof.id_materia1 === mat.id || prof.id_materia2 === mat.id);
      mat.profesores = profes;
    })
  }

  getCheckMateria(event: Event, id: number) {
    this.isChecked = (event.target as HTMLInputElement).checked;
    this.listMaterias[id].checked = this.isChecked;
  }

  getProfesoresMateria(id: number, index: number) {
    this.resetDetails();
    let profes = this.listProfesores.filter(prof => prof.id_materia1 === id || prof.id_materia2 === id);
    this.listMateriasProfesores = profes;
    this.listMaterias[index].showDetails = true;
  }

  resetDetails() {
    this.listMaterias.map(mat => {
      mat.showDetails = false;
    }) 
  }

  acceptMaterias() {
    let arrayCount = this.listMaterias.filter(mat => mat.checked === true).length;
    if (arrayCount > 3) {
      Swal.fire({
        icon: "error",
        text: "No puede seleccionar mas de tres materias",
      });
      return;
    }
    if (arrayCount <= 2) {
      Swal.fire({
        icon: "error",
        text: "Debe seleccionar al menos tres materias",
      });
      return;
    }
  }

}
