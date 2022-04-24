import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ToolbarComponent } from './views/toolbar/toolbar.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioListComponent } from './views/usuario-list/usuario-list.component';
import { LoginComponent } from './views/login/login.component';
import { EditarUsuarioComponent } from './views/editar-usuario/editar-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioNovoComponent } from './views/usuario-novo/usuario-novo.component';
import { ConfirmModalComponent } from './views/confirm-modal/confirm-modal.component';
import { AlertModalComponent } from './views/alert-modal/alert-modal.component';
import { ModalModule } from "ngx-bootstrap/modal";
import { UsuarioStepperComponent } from './views/usuario-stepper/usuario-stepper.component';
import { MatStepperModule } from "@angular/material/stepper";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent,
    UsuarioListComponent,
    LoginComponent,
    EditarUsuarioComponent,
    UsuarioNovoComponent,
    ConfirmModalComponent,
    AlertModalComponent,
    UsuarioStepperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule.forRoot(),
    MatStepperModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
