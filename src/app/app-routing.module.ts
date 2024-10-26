import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NoFoundComponent } from './no-found/no-found.component';
import { LoginComponent } from './login/login.component';
import { ListEstudiantesComponent } from './list-estudiantes/list-estudiantes.component';
import { ListEstudiantesCompartidosComponent } from './list-estudiantes-compartidos/list-estudiantes-compartidos.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home/:name/:cedula', component: HomeComponent },
  { path: 'listEstudiantes/:name/:cedula', component: ListEstudiantesComponent },
  { path: 'listEstudiantesCompartidos/:name/:cedula', component: ListEstudiantesCompartidosComponent },
  { path: '**', component: NoFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
