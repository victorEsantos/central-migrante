import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {take} from "rxjs/operators";
import {Endereco} from "../model/endereco.model";

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  apiUrl = `${environment.API}enderecos`;
  httpOptions = {
    heeaders: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private httpClient: HttpClient
  ) {
  }

  public getById(id: number): Observable<Endereco> {
    return this.httpClient.get<Endereco>(`${this.apiUrl}/${id}`).pipe(take(1))
  }

  public create(endereco: Endereco) {
    return this.httpClient.post(this.apiUrl, endereco).pipe(take(1));
  }

  public update(endereco: Endereco) {
    return this.httpClient.put(`${this.apiUrl}/${endereco.id}`, endereco).pipe(take(1));
  }
}
