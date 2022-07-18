import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from "@angular/router";
import {UsuarioService} from "../../shared/service/usuario.service";
import {Usuario} from "../../shared/model/usuario.model";
import {AlertModelService} from "../../shared/service/alert-model.service";
import {Location} from "@angular/common";
import {MustMatch} from "../usuario-novo/must-match";
import {EnderecoService} from "../../shared/service/endereco.service";
import {Endereco} from "../../shared/model/endereco.model";

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  isView: boolean = false;

  estados = [
    //ESTADOS COM FRONTEIRA COM PAISES
    "SantaCatarina-SC",
    "Amapá-AP",
    "Pará-PA",
    "Roraima-RR",
    "Amazonas-AM",
    "Acre-AC",
    "Rondônia-RO",
    "MatoGrosso-MT",
    "MatoGrossodoSul-MS",
    "Paraná-PR",
    "RioGrandedoSul-RS",

    //ESTADOS SEM FRONTEIRA COM PAISES
    "Alagoas-AL",
    "Bahia-BA",
    "Ceará-CE",
    "EspíritoSanto-ES",
    "Goiás-GO",
    "Maranhão-MA",
    "MinasGerais-MG",
    "Paraíba-PB",
    "Pernambuco-PE",
    "Piauí-PI",
    "RiodeJaneiroRJ",
    "RioGrandedoNorte-RN",
    "SãoPaulo-SP",
    "Sergipe-SE",
    "Tocantins-TO",
    "DistritoFederal-DF"];

  form: FormGroup = this.fb.group({
    id: [0],
    nome: ["null", [Validators.required, Validators.minLength(3), Validators.maxLength(250)]],
    user: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
    email: [null, [Validators.required, Validators.email]],
    senha: ['', [Validators.minLength(6)]],
    confirmaSenha: [''],

    estadoOndeAtravessouFronteira: [null],
    dataNascimento: [null],
    nacionalidade: [null],
    cidadeNascimento: [null],
    telefone: [null],
    cpf: [null],
    crnm: [null],
    crnmVencimento: [null],
    protocoloSolicitacaoRefugio: [null],
    passaporte: [null],

    hasContaBancariaNoBrasil: [null],
    idioma: [null],
    hasFamiliaresNoBrasil: [null],
    viaDeEntrada: [null],
    genero: [null],
    corRaca: [null],

    hasEscolaridade: ["true"],
    hasEnsinoFundamental: [null],
    hasEnsinoMedio: [null],
    hasEnsinoSuperior: [null],
    hasPosGraduacao: [null],

    enderecoId: [null],
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
  isNovoEndereco: boolean = false;

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private modelService: AlertModelService,
    private enderecoService: EnderecoService,
    private location: Location,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    let location = this.location.path().split("/")[1];
    if(location == 'visualizarUsuario'){
      this.isView = true;
      this.form.disable();
    }


    this.route.params.subscribe(
      (params: any) => {
        const id = params['id'];
        const usuario$ = this.usuarioService.getUsuarioById(id);
        usuario$.subscribe(usuario => {
          if (usuario.Endereco == undefined) {
            this.isNovoEndereco = true;
          }
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
      crnmVencimento: usuario.crnmVencimento,
      protocoloSolicitacaoRefugio: usuario.protocoloSolicitacaoRefugio,
      passaporte: usuario.passaporte,

      hasContaBancariaNoBrasil: usuario.hasContaBancariaNoBrasil,
      idioma: usuario.idioma,
      hasFamiliaresNoBrasil: usuario.hasFamiliaresNoBrasil,
      viaDeEntrada: usuario.viaDeEntrada,
      genero: usuario.genero,
      corRaca: usuario.corRaca,


      hasEscolaridade: this.safeBooleanToString((usuario.hasEnsinoFundamental == null && usuario.hasEnsinoMedio == null &&
        usuario.hasEnsinoSuperior == null && usuario.hasPosGraduacao == null)),

      hasEnsinoFundamental: this.safeBooleanToString(usuario.hasEnsinoFundamental),
      hasEnsinoMedio: this.safeBooleanToString(usuario.hasEnsinoMedio),
      hasEnsinoSuperior: this.safeBooleanToString(usuario.hasEnsinoSuperior),
      hasPosGraduacao: this.safeBooleanToString(usuario.hasPosGraduacao),

      enderecoId: usuario.enderecoId,
      estado: usuario.Endereco?.estado,
      cidade: usuario.Endereco?.cidade,
      rua: usuario.Endereco?.rua,
      numero: usuario.Endereco?.numero,
      cep: usuario.Endereco?.cep
    })

  }

  private safeBooleanToString(boolean: boolean): string | null {
    if (boolean == undefined) {
      return null;
    }
    return boolean ? 'true' : 'false';
  }

  onSubmit(): void {
    this.submitted = true;

    console.log(this.form.value)

    if (this.form.valid) {
      this.usuarioService.update(this.form.value).subscribe(
        () => console.log("Etapa salva"),
        () => this.modelService.showAlertDanger("Erro ao criar, tente novamente"),
        () => console.log("request completado")
      );
    }

  }

  onSubmitFinal(): void {
    if (this.form.valid) {
      const endereco: Endereco = {
        id: this.form.value.enderecoId,
        estado: this.form.value.estado,
        cidade: this.form.value.cidade,
        rua: this.form.value.rua,
        numero: this.form.value.numero,
        cep: this.form.value.cep,
      }

      if (this.isNovoEndereco) {
        console.log("criando endereco")
        console.log(endereco)
        this.enderecoService.create(endereco).subscribe(
          data => {
            this.modelService.showAlertSuccess("Dados salvos com sucesso!", 4000);
            this.form.patchValue(
              {
                enderecoId: data
              }
            )

            this.onSubmit();

            this.location.back();
          },
          () => this.modelService.showAlertDanger("Erro ao criar, tente novamente"),
          () => console.log("request completado")
        );
      } else {
        console.log("editando endereco")
        this.enderecoService.update(endereco)
        this.modelService.showAlertSuccess("Dados salvos com sucesso!", 4000);
        this.location.back();
      }
    }
  }

  onCancel(): void {
    this.location.back();
  }

  hasError(field: string) {
    return this.form.get(field)?.errors
  }

  onSemEscolaridade() {
    this.form.patchValue(
      {
        hasEnsinoFundamental: null,
        hasEnsinoMedio: null,
        hasEnsinoSuperior: null,
        hasPosGraduacao: null,
      }
    )
  }

  onComEscolaridade() {
    this.form.patchValue(
      {
        hasEscolaridade: null
      }
    )
  }
}
