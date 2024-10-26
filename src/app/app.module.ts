import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NoFoundComponent } from './no-found/no-found.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ListEstudiantesComponent } from './list-estudiantes/list-estudiantes.component';
import { ListEstudiantesCompartidosComponent } from './list-estudiantes-compartidos/list-estudiantes-compartidos.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NoFoundComponent,
    LoginComponent,
    ListEstudiantesComponent,
    ListEstudiantesCompartidosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
