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
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import {MatSortModule} from "@angular/material/sort";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import { HeaderComponent } from './views/header/header.component';
import { FooterComponent } from './views/footer/footer.component';
import { AuthInterceptor } from './shared/_helpers/auth.interceptor';
import { InternationalizationModule } from './internationalization/internationalization.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

/**
* The http loader factory : Loads the files from define path.
* @param {HttpClient} http
* @returns {TranslateHttpLoader}
* @constructor
*/
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/locales/', '.json');
}

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
    UsuarioStepperComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule.forRoot(),
    MatStepperModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatButtonModule,
    MatMenuModule,
    InternationalizationModule.forRoot({ locale_id: 'en-US' }), // iniating with default language: en-US
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
