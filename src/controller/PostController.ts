import { Request, response, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { UserBusiness } from "../business/UserBusiness";
import { ApiResponse, Post } from "../Interfaces";
import { API_RESPONSE } from "../API_RESPONSE";

export class PostController {
  postBusiness = new PostBusiness();
  userBusiness = new UserBusiness();

  criarPost = (req: Request, res: Response) => {
    let response: ApiResponse<Post>;

    try {
      const { title, content, authorId } = req.body;

      response = this.postBusiness.cadastrarNovoPost(
        title,
        content,
        Number.parseInt(authorId),
        this.userBusiness,
      );

      API_RESPONSE.SEND(res, response);
    } catch (error: any) {
      response = {
        success: true,
        message: error.sqlMessage || error.message,
        data: [],
        total: 0,
        statusCode: API_RESPONSE.STATUS_CODE_SERVER_ERROR,
      };

      API_RESPONSE.SEND(res, response);
    }
  };

  buscarPosts = (req: Request, res: Response) => {
    let response: ApiResponse<Post>;

    try {
      const response = this.postBusiness.obterTodosPosts();
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

  atualizarPostParcialmente = (req: Request, res: Response) => {
    let response: ApiResponse<Post>;

    try {
      console.log("-> Controller ~ Pegando paramentros...");
      console.log(req.body);
      const id = Number.parseInt(req.params.id);
      const { title, content, published } = req.body;

      console.log("-> Controller ~ Verificando parametros...");
      response = this.postBusiness.atualizarPost(id, title, content, published);

      console.log("-> Controller ~ Enviando resposta client");
      API_RESPONSE.SEND(res, response);
    } catch (error: any) {
      response = {
        success: true,
        message: error.sqlMessage || error.message,
        data: [],
        total: 0,
        statusCode: API_RESPONSE.STATUS_CODE_SERVER_ERROR,
      };

      API_RESPONSE.SEND(res, response);
    }
  };

  deletarPostPorId = (req: Request, res: Response) => {
    let response: ApiResponse<Post>;

    try {
      const id = req.params.id;
      let header = req.get("User-Id");

      if (!header) {
        response = {
          success: false,
          message:
            API_RESPONSE.PARAMETRO_FALTANDO_MESSAGE + ": " + "HEADER User-Id",
          data: [],
          total: 0,
          statusCode: API_RESPONSE.STATUS_CODE_DADOS_INVALIDOS,
        };

        API_RESPONSE.SEND(res, response);
        return;
      }

      response = this.postBusiness.removerPost(
        Number.parseInt(id),
        Number.parseInt(header),
        this.userBusiness,
      );

      API_RESPONSE.SEND(res, response);
    } catch (error: any) {
      response = {
        success: true,
        message: error.sqlMessage || error.message,
        data: [],
        total: 0,
        statusCode: API_RESPONSE.STATUS_CODE_SERVER_ERROR,
      };

      API_RESPONSE.SEND(res, response);
    }
  };
}
