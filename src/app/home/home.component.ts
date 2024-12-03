import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ConsultEstudianteService } from 'src/services/consultEstudiante.services';
import { ConsultMateriaService } from 'src/services/consultMaterias.services';
import { ConsultProfesoresService } from 'src/services/consultProfesor.services';
import { Estudiante } from 'src/shared/interfaces/IEstudiante';
import { Materia, MateriaElejida } from 'src/shared/interfaces/IMateria';
import { Profesor } from 'src/shared/interfaces/IProfesor';
import Swal from 'sweetalert2'
import { ModalUpdateMateriaComponent } from './modal-update-materia/modal-update-materia.component';

@Component({
  selector: 'app-home',  
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit { 

    listMaterias: Materia[];  



    

  listMateriasProfesores: Profesor[];
  listProfesores: Profesor[];
  listaMateriasEstudiante: Estudiante[];
  listMateriasEscogidas: MateriaElejida[] = [];
  isChecked: boolean = false;
  cedula: string = '';
  name: string = '';
  loading: boolean = false;

  constructor(private consultMateriaService: ConsultMateriaService,
    private consultProfesoresService: ConsultProfesoresService,
    private consultEstudianteService: ConsultEstudianteService,
    private router: Router,
    private route: ActivatedRoute,
    private __dialog: MatDialog
  ) {

    this.route.paramMap.subscribe(params => {
      this.cedula = String(params.get('cedula'));
      this.name = String(params.get('name'));
    });
  }

  ngOnInit(): void {
    this.getMaterias();

  }

  getMaterias() {
    this.consultMateriaService.getMaterias().subscribe({
      next: (data) => {
        this.listMaterias = data;
        this.getMateriasEstudiante();
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
    this.consultEstudianteService.getEstudiante().subscribe({
      next: (data) => {
        this.listaMateriasEstudiante = data.filter(data => Number(data.cedula) === Number(this.cedula));
        this.listaMateriasEstudiante.map(matEstu => {
          this.listMaterias.map(mat => {
            if (matEstu.materia_Id === mat.id) {
              mat.checked = true
            }
          })
        })
      },
      error: (error) => {
        Swal.fire({
          icon: "error",
          text: "No tiene materias asignadas",
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
      let profes = this.listProfesores.filter(prof => prof.id_Materia1 === mat.id || prof.id_Materia2 === mat.id);
      mat.profesores = profes;
    })
  }

  openModalUpdate(item: Materia) {
    const dialogRef = this.__dialog.open(ModalUpdateMateriaComponent, {
      width: '30%',
      height: '35%',
      data: item,
    });

    dialogRef.afterClosed().subscribe(() => {
      dialogRef.close();
      this.getMaterias();
    })
  }

  getCheckMateria(event: boolean, id: number) {
    if (this.acceptMaterias()) {
      return;
    }
    this.isChecked = event;
    if (this.isChecked) {
      if (this.validateNameProfesor(this.listMaterias[id])) {
        Swal.fire({
          icon: "error",
          text: "No puedes tomar clase con el mismo profesor. Favor elegir otra materia",
        });
        this.listMaterias[id].checked = !this.isChecked;
      } else {
        this.listMateriasEscogidas.push({
          id: id,
          checked: true,
          nombre: this.listMaterias[id].nombre,
          creditos: this.listMaterias[id].creditos,
          profesor: this.listMaterias[id].profesores[0].nombres,
          profesorID: this.listMaterias[id].profesores[0].id,
          showDetails: true
        })
        this.listMaterias[id].checked = this.isChecked;

        let objEstudiante: Estudiante = {
          id: 0,
          cedula: String(this.cedula),
          nombre: this.name,
          materia_Id: this.listMaterias[id].id,
          profesor_Id: this.listMaterias[id].profesores[0].id
        }
        this.consultEstudianteService.postEstudiante(objEstudiante).subscribe({
          next: (data) => {
            Swal.fire({
              icon: "success",
              text: "Se guardo la materia exitosamente",
            });
            this.getMateriasEstudiante();
          },
          error: (error) => {
            Swal.fire({
              icon: "error",
              text: "Error al momento de grabar la materia",
            });
          }
        })

      }
    }

  }

  getProfesoresMateria(id: number, index: number) {
    this.resetDetails();
    let profes = this.listProfesores.filter(prof => prof.id_Materia1 === id || prof.id_Materia2 === id);
    this.listMateriasProfesores = profes;
    //this.listMaterias[index].showDetails = true;
  }

  resetDetails() {
    this.listMaterias.map(mat => {
      //mat.showDetails = false;
    })
  }

  acceptMaterias(): boolean {
    let accept: boolean = false;
    let arrayCount = this.listMaterias.filter(mat => mat.checked === true).length;
    let count = 0;
    if (arrayCount >= 3) {
      Swal.fire({
        icon: "error",
        text: "No puede seleccionar mas de tres materias",
      });
      return accept = true;
    }
    return accept;
  }

  validateNameProfesor(matProf: Materia): boolean {
    let findProf: boolean = false;
    let listMate = this.listMaterias.filter(mat => mat.checked === true);
    if (listMate.length > 0) {
      listMate.map(mat => {
        mat.profesores.map(prof => {
          if (matProf.profesores.includes(prof)) {
            findProf = true;
          }
        })
      })
    }
    return findProf;
  }

  deleteSelection(item: Estudiante) {
    Swal.fire({
      title: "Desea eliminar esta materia?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: `No eliminar`
    }).then((result) => {

      if (result.isConfirmed) {
        this.consultEstudianteService.deleteMateriaEstudiante(item.id || 0).subscribe({
          next: (data) => {
            Swal.fire("Eliminado", "", "success");
            this.getMaterias();
          },
          error: (error) => {
            if (error.status === 200) {
              Swal.fire("Eliminado", "", "success");
              this.getMaterias();
            } else {
              Swal.fire("Error al momento de eliminar la materia", "", "error");

            }
          }
        })

      } else if (result.isDenied) {
        Swal.fire("Materia no eliminada", "", "info");
      }
    });

  }

  exit() {
    this.router.navigate(['']);
  }

}
