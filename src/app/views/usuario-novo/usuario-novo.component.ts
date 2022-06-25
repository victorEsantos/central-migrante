import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsuarioService} from 'src/app/shared/service/usuario.service';
import {MustMatch} from './must-match';
import {AlertModelService} from "../../shared/service/alert-model.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-usuario-novo',
  templateUrl: './usuario-novo.component.html',
  styleUrls: ['./usuario-novo.component.css']
})
export class UsuarioNovoComponent implements OnInit {

  form: FormGroup = this.fb.group({
    nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
    email: [null, [Validators.required, Validators.email]]
  });

  submitted: boolean = false;

  constructor(private fb: FormBuilder, private service: UsuarioService, private modal: AlertModelService,
              private location: Location) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
      user: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      email: [null, [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmaSenha: ['', Validators.required],
    },
      {
        validator: MustMatch('senha', 'confirmaSenha')
      });
  }

  get f() { return this.form.controls; }

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
