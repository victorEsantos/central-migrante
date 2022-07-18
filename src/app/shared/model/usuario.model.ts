import {Endereco} from "./endereco.model";

export interface Usuario {
  [x: string]: any;
  id: number;
  nome: string;
  email: string;
  user: string;
  senha: string;
  dataNascimento: Date;
  nacionalidade: string;
  cidadeNascimento: string;
  genero: string;
  corRaca: string;
  estadoOndeAtravessouFronteira: string;
  viaDeEntrada: string;
  hasFamiliaresNoBrasil: boolean;
  telefone: string;
  cpf: string;
  crnm: string;
  crnmVencimento: Date,
  protocoloSolicitacaoRefugio: string;
  passaporte: string;
  ctps: string;
  hasContaBancariaNoBrasil: boolean;
  idioma: string;
  hasEnsinoFundamental: boolean;
  hasEnsinoMedio: boolean;
  hasEnsinoSuperior: boolean;
  hasPosGraduacao: boolean;
  hasComprovanteEscolaridade: boolean;
  retomarEstudosBrasil: boolean;
  fazTratamentoSaude: boolean;
  profissao: string;
  situacaoMigratoria: string;
  observacao: string;

  enderecoId: number;
  Endereco: Endereco;
}
