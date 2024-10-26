import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  nameUser: string = '';

  constructor(private router: Router){

  }

  catchValueUser(event: Event) {
    const valueTarget = event.target as HTMLInputElement;
    this.nameUser = valueTarget.value;
  }
  
  login(){
    if(this.validateName()) {
      Swal.fire({
        title: `Estas seguro de ingresar ${this.nameUser}?` ,
        text: "Programa de creditos",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ingresar"
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/home']);
        }
      });
    }
  }


  validateName() :boolean {
    if(String(this.nameUser).trim() === '') {
      Swal.fire({
        icon: "error",
        title: "Error !!!",
        text: "Favor ingresar el nombre",
      });
      return false;
    }
    return true;
  }
  ngOnInit(): void {
  }

}
