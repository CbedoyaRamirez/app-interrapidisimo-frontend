import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NoFoundComponent } from './no-found/no-found.component';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ListEstudiantesComponent } from './list-estudiantes/list-estudiantes.component';
import { ListEstudiantesCompartidosComponent } from './list-estudiantes-compartidos/list-estudiantes-compartidos.component';
import { GlobalLoadingComponent } from './global-loading/global-loading.component';
import { httpinterceptor } from 'src/shared/interceptor/httpinterceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NoFoundComponent,
    LoginComponent,
    ListEstudiantesComponent,
    ListEstudiantesCompartidosComponent,
    GlobalLoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule 
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: httpinterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
