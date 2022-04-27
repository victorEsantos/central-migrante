import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarUsuarioComponent } from './views/editar-usuario/editar-usuario.component';
import { HomeComponent } from './views/home/home.component';
import { UsuarioListComponent } from './views/usuario-list/usuario-list.component';
import { UsuarioNovoComponent } from './views/usuario-novo/usuario-novo.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'editarUsuario/:id',
    component: EditarUsuarioComponent
  },
  {
    path: 'visualizarUsuario/:id',
    component: EditarUsuarioComponent
  },
  {
    path: 'novoUsuario',
    component: UsuarioNovoComponent
  },
  {
    path: 'listarUsuarios',
    component: UsuarioListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
