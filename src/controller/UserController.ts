import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { PostBusiness } from "../business/PostBusiness";
import { ApiResponse, User } from "../Interfaces";
import { API_RESPONSE } from "../API_RESPONSE";

export class UserController<T> {
  userBusiness = new UserBusiness();
  postBusiness = new PostBusiness();

  verify = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      const user = this.userBusiness.verify(email);
      console.log("user:", user);
      res.send(user);
    } catch (error: any) {
      res.send(error.sqlMessage || error.message);
    }
  };

  buscarUsuarioPorId = async (req: Request, res: Response) => {
    let response: ApiResponse<User>;

    try {
      const { id } = req.params;

      console.log("buscando usuario por ID!");
      const response = await this.userBusiness.obterUsuarioPorId(Number(id));

      console.log("Retornando");
      API_RESPONSE.SEND(res, response);
    } catch (error: any) {
      console.log(error.sqlMessage || error.message);

      response = {
        success: false,
        message: error.message,
        data: [],
        total: 0,
        statusCode: API_RESPONSE.STATUS_CODE_SERVER_ERROR,
      };

      console.log("Enviando error....");
      API_RESPONSE.SEND(res, response);
    }
  };

  buscarUsuariosPorFaixaEtaria = (req: Request, res: Response) => {
    let response: ApiResponse<User>;

    try {
      console.log("Pegando parametros.....");
      const min = req.query.min;
      const max = req.query.max;

      console.log("Verificando parametros com userBusiness");
      response = this.userBusiness.obterUsuariosPorFaixaEtaria(
        Number(min),
        Number(max),
      );

      API_RESPONSE.SEND(res, response);
    } catch (error: any) {
      response = {
        success: false,
        message: error.message,
        data: [],
        total: 0,
        statusCode: API_RESPONSE.STATUS_CODE_SERVER_ERROR,
      };

      API_RESPONSE.SEND(res, response);
    }
  };

  buscarTodosUsuarios = async (req: Request, res: Response) => {
    let response: ApiResponse<User>;

    try {
      console.log("Obetendo todos os usuarios...");
      response = await this.userBusiness.obterTodosUsuarios();

      console.log("Enviando resposta");
      API_RESPONSE.SEND(res, response);
    } catch (error: any) {
      response = {
        success: false,
        message: error.sqlMessage || error.message,
        data: [],
        total: 0,
        statusCode: API_RESPONSE.STATUS_CODE_SERVER_ERROR,
      };

      API_RESPONSE.SEND(res, response);
    }
  };

  atualizarUsuarioPorId = async (req: Request, res: Response) => {
    let response: ApiResponse<User>;

    try {
      console.log("Pegando parametros");
      const id = req.params.id;
      const { name, email, senha, idade } = req.body;

      console.log("Chamando verificador....");
      response = await this.userBusiness.atualizarUsuario(
        Number.parseInt(id),
        name,
        email,
        senha,
        idade,
      );

      console.log("Enviando resposta....");
      API_RESPONSE.SEND(res, response);
    } catch (error: any) {
      response = {
        success: false,
        message: error.sqlMessage || error.message,
        data: [],
        total: 0,
        statusCode: API_RESPONSE.STATUS_CODE_SERVER_ERROR,
      };

      API_RESPONSE.SEND(res, response);
    }
  };

  deletarUsuariosSemPosts = async (req: Request, res: Response) => {
    let response: ApiResponse<User>;

    try {
      console.log("Pegando parametros....");
      let condicional = req.query.confirm?.toString().toLowerCase();

      console.log("Enviando paramentros para verificação....");
      response = await this.userBusiness.removerUsuariosSemPosts(
        condicional,
        this.postBusiness,
      );

      console.log("Enviando resposta...");
      API_RESPONSE.SEND(res, response);
    } catch (error: any) {
      response = {
        success: false,
        message: error.sqlMessage || error.message,
        data: [],
        total: 0,
        statusCode: API_RESPONSE.STATUS_CODE_SERVER_ERROR,
      };

      API_RESPONSE.SEND(res, response);
    }
  };
}
