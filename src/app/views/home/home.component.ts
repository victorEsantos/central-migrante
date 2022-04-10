import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/shared/model/usuario.model';
import { UsuarioService } from 'src/app/shared/service/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuarios: Usuario[] = [];

  usuarios$?: Observable<Usuario[]>;

  constructor(private service: UsuarioService) { }

  ngOnInit(): void {
    // this.service.getAllUsuarios().subscribe(data => this.usuarios = data)

    this.usuarios$ = this.service.getAllUsuarios();
  }

}
