import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from "@angular/router";
import {UsuarioService} from "../../shared/service/usuario.service";
import {Usuario} from "../../shared/model/usuario.model";
import {AlertModelService} from "../../shared/service/alert-model.service";
import {Location} from "@angular/common";
import {MustMatch} from "../usuario-novo/must-match";

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  form: FormGroup = this.fb.group({
    nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
    email: [null, [Validators.required, Validators.email]]
  });

  submitted: Boolean = false;

  constructor(private fb: FormBuilder, private service: UsuarioService, private modal: AlertModelService,
              private location: Location, private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.form = this.fb.group({
        nome: ["null", [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
        user: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
        email: [null, [Validators.required, Validators.email]],
        senha: ['', [Validators.required, Validators.minLength(6)]],
        confirmaSenha: ['', Validators.required],
      },
      {
        validator: MustMatch('senha', 'confirmaSenha')
      });

    this.route.params.subscribe(
      (params: any)=>{
        const id = params['id'];
        const usuario$ = this.service.getUsuarioById(id);
        usuario$.subscribe(usuario =>{
            this.updateForm(usuario);
        })
      }
    )
  }

  updateForm(usuario: Usuario){
    this.form.patchValue({
      nome: usuario.nome,
      user: usuario.user,
      email: usuario.email,
      senha: usuario.senha,
      confirmaSenha: usuario.senha
    })

  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    console.log(this.form.value)
    if (this.form.valid) {
      this.service.create(this.form.value).subscribe(
        success => {
          this.modal.showAlertSuccess("Criado com sucesso!");

          this.location.back();
        },
        error => this.modal.showAlertDanger("Erro ao criar, tente novamente"),
        () => console.log("request completado")
      );
    }
  }

  hasError(field: string) {
    return this.form.get(field)?.errors

  }

}
