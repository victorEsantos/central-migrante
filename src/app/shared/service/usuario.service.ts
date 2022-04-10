import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  apiUrl = `${environment.API}usuarios`;
  httpOptions = {
    heeaders: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllUsuarios(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.apiUrl)
  }
}
