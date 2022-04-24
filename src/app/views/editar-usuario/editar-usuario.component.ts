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
      id: [0],
      nome: ["null", [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
      user: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      email: [null, [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmaSenha: ['', Validators.required],

      estadoOndeAtravessouFronteira: [null],
      dataNascimento: [null],
      nacionalidade: [null],
      cidadeNascimento: [null],
      telefone: [null],
      cpf: [null],
      crnm: [null],
      protocoloSolicitacaoRefugio: [null],
      passaporte: [null],

      hasContaBancariaNoBrasil: [null],
      idioma: [null],
      hasFamiliaresNoBrasil: [null],
      viaDeEntrada: [null],
      genero: [null],
      corRaca: [null],

      estado: [null],
      cidade: [null],
      rua: [null],
      numero: [null],
      cep: [null]

    },
    {
      validator: MustMatch('senha', 'confirmaSenha')
    });

  submitted: boolean = false;

  constructor(private fb: FormBuilder, private service: UsuarioService, private modal: AlertModelService,
              private location: Location, private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.route.params.subscribe(
      (params: any) => {
        const id = params['id'];
        const usuario$ = this.service.getUsuarioById(id);
        usuario$.subscribe(usuario => {
          this.updateForm(usuario);
        })
      }
    )
  }

  updateForm(usuario: Usuario) {
    this.form.patchValue({
      id: usuario.id,
      nome: usuario.nome,
      user: usuario.user,
      email: usuario.email,
      senha: usuario.senha,
      confirmaSenha: usuario.senha,

      estadoOndeAtravessouFronteira: usuario.estadoOndeAtravessouFronteira,
      dataNascimento: usuario.dataNascimento,
      nacionalidade: usuario.nacionalidade,
      cidadeNascimento: usuario.cidadeNascimento,
      telefone: usuario.telefone,
      cpf: usuario.cpf,
      crnm: usuario.crnm,
      protocoloSolicitacaoRefugio: usuario.protocoloSolicitacaoRefugio,
      passaporte: usuario.passaporte,

      hasContaBancariaNoBrasil: usuario.hasContaBancariaNoBrasil,
      idioma: usuario.idioma,
      hasFamiliaresNoBrasil: usuario.hasFamiliaresNoBrasil,
      viaDeEntrada: usuario.viaDeEntrada,
      genero: usuario.genero,
      corRaca: usuario.corRaca,

      estado: usuario.estado,
      cidade: usuario.cidade,
      rua: usuario.rua,
      numero: usuario.numero,
      cep: usuario.cep
    })

  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    console.log(this.form.value)
    if (this.form.valid) {
      this.service.update(this.form.value).subscribe(
        () => {
          this.modal.showAlertSuccess("Salvo com sucesso!");

          // this.location.back();
        },
        () => this.modal.showAlertDanger("Erro ao criar, tente novamente"),
        () => console.log("request completado")
      );
    }
  }

  onCancel(): void {
    this.form.reset();
  }

  hasError(field: string) {
    return this.form.get(field)?.errors

  }

}
