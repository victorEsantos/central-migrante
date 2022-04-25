import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../model/usuario.model';
import {take} from "rxjs/operators";

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

  public getAllUsuarios(nome?: string): Observable<any> {
    let url = this.apiUrl;
    if (nome) {
      url = url + "?nome=" + nome;
    }
    return this.httpClient.get<any>(url).pipe(take(1));
  }

  public getUsuarioById(id:number): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${this.apiUrl}/${id}`).pipe(take(1));
  }

  public create(usuario: Usuario) {
    return this.httpClient.post(this.apiUrl + "/register", usuario).pipe(take(1));
  }

  public update(usuario: Usuario) {
    return this.httpClient.put(`${this.apiUrl}/${usuario.id}`, usuario).pipe(take(1));
  }
}
