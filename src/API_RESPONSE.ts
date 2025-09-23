import { response, Response } from "express";
import { ApiResponse } from "./Interfaces";

export class API_RESPONSE {
  static statusCode: number = 0;

  static VAZIO_MESSAGE: string = "A pesquisa retornou vazio";
  static PARAMETRO_FALTANDO_MESSAGE = "O parametro obrigatorio esta faltando";
  static OK_MESSAGE = "Operação feita com sucesso";
  static OK_CRIADO = "Operação de criação feita com sucesso";
  static OK_ATUALIZADO = "Operação de atualização feita com sucesso";
  static OK_DELETADO = "Operação de deletar feita com sucesso";
  static PARAMETRO_TAMANHO_INCORRETO =
    "Tamanho do parametro esta muito pequeno ou muito grande";
  static PARAMETRO_INVALIDO = "O parametro colocado e invalido";
  static VALOR_JA_EXISTE = "O valor que esta tentando criar ja existe";
  static OPERACAO_CANCELADA =
    "A operação foi cancelada ou não aceita pelo usuario";
  static SEM_PERMISSAO =
    "Usuario ou ator não tem permissão para executar operação";

  static STATUS_CODE_OK = 200;
  static STATUS_CODE_SEM_CONTEUDO = 204;
  static STATUS_CODE_CRIADO = 201;

  static STATUS_CODE_SEM_PERMISAO = 401;
  static STATUS_CODE_DADOS_INVALIDOS = 400;
  static STATUS_CODE_NAO_ENCONTRADO = 404;
  static STATUS_CODE_JA_EXISTE = 409;

  static STATUS_CODE_SERVER_ERROR = 500;

  static SEND = (res: Response, data: ApiResponse<any>) => {
    res.status(data.statusCode).json(data);
  };
}
