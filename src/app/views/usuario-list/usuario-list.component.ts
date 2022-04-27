import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/shared/model/usuario.model';
import { UsuarioService } from 'src/app/shared/service/usuario.service';
import { Router } from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  usuarios: Usuario[] = [];

  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource(this.usuarios);
  columns: string[] = ['#', 'Nome', 'Email', 'Actions']

  form: FormGroup = this.fb.group({
    nome: [null]
  });

  usuariosPagable$?: Observable<any>;

  constructor(private service: UsuarioService, private route: Router, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.service.getAllUsuarios().subscribe(data => {
      this.usuarios = data;
      this.dataSource.data = data;
    });

  }

  onEdit(id: number) {
    this.route.navigate(['/editarUsuario', id ])
  }

  onView(id: number) {
    this.route.navigate(['/visualizarUsuario', id ])
  }

  onPesquisar() {
    this.usuariosPagable$ = this.service.getAllUsuarios(this.form.value?.nome);
  }

  ngAfterViewInit (){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (<HTMLInputElement>event.target).value

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
