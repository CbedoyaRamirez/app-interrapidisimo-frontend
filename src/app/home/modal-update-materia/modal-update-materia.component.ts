import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConsultMateriaService } from 'src/services/consultMaterias.services';
import { Materia } from 'src/shared/interfaces/IMateria';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-modal-update-materia',
  templateUrl: './modal-update-materia.component.html',
  styleUrls: ['./modal-update-materia.component.scss']
})
export class ModalUpdateMateriaComponent implements OnInit {

  id: number ;
  nombre: string = '';
  credito: number;

  constructor(private dialogRef: MatDialogRef<ModalUpdateMateriaComponent>,
    private consultMateriaService: ConsultMateriaService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Materia) { 
    this.id = Number(data["id"]);
    this.nombre = data["nombre"];
    this.credito = Number(data['creditos']);
  }

  ngOnInit(): void {
  }

  capturarNombre(event: Event) {
    const valueTarget = event.target as HTMLInputElement;
    this.nombre = String(valueTarget.value);
  }

  capturarCredito(event: Event) {
    const valueTarget = event.target as HTMLInputElement;
    this.credito = Number(valueTarget.value);
  }

  update() {
    let itemMateria:Materia;
    itemMateria = {
      "id": this.id,
      "nombre": this.nombre,
      "creditos": Number(this.credito),
      "checked": false,
      "profesores": []
    }
    this.consultMateriaService.updateMateria(itemMateria).subscribe({
      next:(data) => {
        Swal.fire({
          icon: "success",
          text: "Actualizacion de la materia exitosamente",
        });
      }, error: (error) => {
        Swal.fire({
          icon: "error",
          text: "Error actualizando la materia",
        });
      }
    })
  }

  salir() {
    this.dialogRef.close()
  }

}
