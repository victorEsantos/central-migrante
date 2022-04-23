import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/shared/model/usuario.model';
import { UsuarioService } from 'src/app/shared/service/usuario.service';
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {

  usuarios: Usuario[] = [];

  usuarios$?: Observable<Usuario[]>;

  constructor(private service: UsuarioService, private route: Router) {
  }

  ngOnInit(): void {
    // this.service.getAllUsuarios().subscribe(data => this.usuarios = data)

    this.usuarios$ = this.service.getAllUsuarios();
  }

  onEdit(id: number) {
    this.route.navigate(['/editarUsuario', id ])
  }
}
