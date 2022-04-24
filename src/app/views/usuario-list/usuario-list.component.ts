import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/shared/model/usuario.model';
import { UsuarioService } from 'src/app/shared/service/usuario.service';
import { Router } from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {
  form: FormGroup = this.fb.group({
    nome: [null]
  });

  usuarios: Usuario[] = [];

  usuarios$?: Observable<Usuario[]>;

  constructor(private service: UsuarioService, private route: Router, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    // this.service.getAllUsuarios().subscribe(data => this.usuarios = data)

    this.usuarios$ = this.service.getAllUsuarios();
  }

  onEdit(id: number) {
    this.route.navigate(['/editarUsuario', id ])
  }

  onPesquisar() {
    this.usuarios$ = this.service.getAllUsuarios(this.form.value?.nome);
  }
}
