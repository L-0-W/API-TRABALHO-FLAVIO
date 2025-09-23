import { API_RESPONSE } from "../API_RESPONSE";
import { posts, users } from "../bd";
import { PostData } from "../data/PostData";
import { ApiResponse, Post } from "../Interfaces";
import { UserBusiness } from "./UserBusiness";

export class PostBusiness {
  postData = new PostData();

  cadastrarNovoPost = (
    title: string,
    content: string,
    authorId: number,
    userBusiness: UserBusiness,
  ) => {
    try {
      let response: ApiResponse<Post>;

      console.log("Verificando se parametros estão prenchidos....");
      if (!title || !content || !authorId) {
        console.log("Parametros incorretos, retornando messagem....");
        response = {
          success: false,
          message: API_RESPONSE.PARAMETRO_INVALIDO,
          data: [],
          total: 0,
          statusCode: API_RESPONSE.STATUS_CODE_DADOS_INVALIDOS,
        };

        return response;
      }

      console.log("Verificando tamanho dos parametros....");
      if (title.length < 3 || content.length < 10 || authorId < 0) {
        console.log(
          "Um dos parametros tem tamanho incorreto, retornando messagem....",
        );
        response = {
          success: false,
          message: API_RESPONSE.PARAMETRO_TAMANHO_INCORRETO,
          data: [],
          total: 0,
          statusCode: API_RESPONSE.STATUS_CODE_DADOS_INVALIDOS,
        };

        return response;
      }

      console.log("Verificando se usuario existe...");
      const userExist = userBusiness.obterUsuarioPorId(Number(authorId));

      console.log("Verificando se consulta retornou vazio...");
      if (!userExist.data || userExist.data.length <= 0) {
        console.log("Consulta retornou vazio....");

        response = {
          success: false,
          message:
            API_RESPONSE.PARAMETRO_INVALIDO + ": " + "USUARIO NÂO EXISTE",
          data: [],
          total: 0,
          statusCode: API_RESPONSE.STATUS_CODE_NAO_ENCONTRADO,
        };

        return response;
      }

      let novoPostId = 1;

      console.log("Verificando se existe posts...");
      if (!this.postData.verificarBancoEstaVazio()) {
        console.log("Banco não esta vazio, pegando ultimo ID...");
        novoPostId = this.postData.buscarUltimoPostId() + 1;
      }

      const post = this.postData.inserirNovoPost(
        novoPostId,
        title,
        content,
        authorId,
      ) as any;

      response = {
        success: true,
        message: API_RESPONSE.OK_CRIADO,
        data: post,
        total: post.length,
        statusCode: API_RESPONSE.STATUS_CODE_CRIADO,
      };

      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  obterTodosPosts = () => {
    try {
      let response: ApiResponse<Post>;
      const posts = this.postData.consultarTodosPosts();

      if (posts.length <= 0) {
        response = {
          success: true,
          message: API_RESPONSE.VAZIO_MESSAGE,
          data: [],
          total: 0,
          statusCode: API_RESPONSE.STATUS_CODE_NAO_ENCONTRADO,
        };

        return response;
      }

      response = {
        success: true,
        message: API_RESPONSE.OK_MESSAGE,
        data: posts,
        total: posts.length,
        statusCode: API_RESPONSE.STATUS_CODE_OK,
      };

      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  atualizarPost = (
    id: number,
    title: string,
    content: string,
    published: boolean,
  ) => {
    try {
      let response: ApiResponse<Post>;

      console.log(
        "-> Business ~ Verificando parametros title, content e published....",
      );
      if (!title && !content && !published) {
        console.log(
          "-> Business ~ Parametro title, content e published faltando, enviando messagem...",
        );
        response = {
          success: false,
          message:
            API_RESPONSE.PARAMETRO_FALTANDO_MESSAGE +
            ": " +
            "E PRECISO PELO MENOS 1 PARAMETRO",
          data: [],
          total: 0,
          statusCode: API_RESPONSE.STATUS_CODE_DADOS_INVALIDOS,
        };

        return response;
      }

      console.log("-> Business ~ Verificando parametro ID....");
      if (!id) {
        console.log(
          "-> Business ~ Parametro ID faltando ou == 0, enviando messagem...",
        );
        response = {
          success: false,
          message:
            id == 0
              ? API_RESPONSE.PARAMETRO_INVALIDO
              : API_RESPONSE.PARAMETRO_FALTANDO_MESSAGE,
          data: [],
          total: 0,
          statusCode: API_RESPONSE.STATUS_CODE_DADOS_INVALIDOS,
        };

        return response;
      }

      console.log("-> Business ~ Verificando se post existe....");
      if (this.postData.buscarPostPorId(id).length <= 0) {
        console.log("-> Business ~ Post não existe, retornando messagem....");
        response = {
          success: false,
          message:
            API_RESPONSE.PARAMETRO_INVALIDO + ": " + "ID POST NÂO EXISTE",
          data: [],
          total: 0,
          statusCode: API_RESPONSE.STATUS_CODE_DADOS_INVALIDOS,
        };

        return response;
      }

      console.log("-> Business ~ Fazendo atualização de post....");
      const post_atualizado = this.postData.salvarAtualizacaoPost(
        id,
        title ? title : undefined,
        content ? content : undefined,
        published ? published : undefined,
      );

      console.log("-> Business ~ Enviando resposta....");
      response = {
        success: true,
        message: API_RESPONSE.OK_ATUALIZADO,
        data: post_atualizado,
        total: 1,
        statusCode: API_RESPONSE.STATUS_CODE_OK,
      };

      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  removerPost = (
    post_id: number,
    user_id: number,
    userBusiness: UserBusiness,
  ) => {
    try {
      let response: ApiResponse<Post>;

      console.log("-> Business ~ Verificando USER_ID....");
      if (user_id <= 0) {
        console.log("-> Business ~ USER_ID tamanho incorreto....");
        response = {
          success: false,
          message: API_RESPONSE.PARAMETRO_TAMANHO_INCORRETO + ": " + "USER_ID",
          data: [],
          total: 0,
          statusCode: API_RESPONSE.STATUS_CODE_SERVER_ERROR,
        };

        return response;
      }

      console.log("-> Business ~ Consultando Posts Por ID....");
      const postDelete = this.postData.buscarPostPorId(post_id);

      console.log("-> Business ~ Obtendo usuarios por ID....");
      const userDeleting = userBusiness.obterUsuarioPorId(user_id);

      console.log(
        "-> Business ~ Verificando se consulta de post retornou vazio",
      );
      if (postDelete.length <= 0) {
        console.log(
          "-> Business ~ Consulta post retornou vazio, enviando mensagem...",
        );

        response = {
          success: false,
          message:
            API_RESPONSE.PARAMETRO_INVALIDO + ": " + "ID de post não existe",
          data: [],
          total: 0,
          statusCode: API_RESPONSE.STATUS_CODE_NAO_ENCONTRADO,
        };

        return response;
      }

      console.log(
        "-> Business ~ Verificando se consulta de usuario retornou vazio",
      );
      if (userDeleting.data.length <= 0) {
        console.log(
          "-> Business ~ Consulta de usuario retornou vazio,  enviando mensagem...",
        );

        response = {
          success: false,
          message:
            API_RESPONSE.PARAMETRO_INVALIDO + ": " + "ID de usuario não existe",
          data: [],
          total: 0,
          statusCode: API_RESPONSE.STATUS_CODE_NAO_ENCONTRADO,
        };

        return response;
      }

      console.log(
        "-> Business ~ Verificando se usuario tem permissão para exlcuir post...",
      );

      if (
        postDelete[0].authorId != user_id &&
        userDeleting.data[0].role === "user"
      ) {
        console.log("-> Business ~ Usuario não e permitido exluir post....");

        response = {
          success: false,
          message: API_RESPONSE.SEM_PERMISSAO,
          data: [],
          total: 0,
          statusCode: API_RESPONSE.STATUS_CODE_SEM_PERMISAO,
        };

        return response;
      }

      console.log("-> Business ~ Buscando index do post....");
      const index = this.postData.buscarPostIndex(post_id);

      console.log(posts[index] + " " + index);

      console.log("-> Business ~ Exluir post do banco....");
      this.postData.excluirPostDoBanco(index, post_id);

      console.log("-> Business ~ Retornando resposta....");

      response = {
        success: true,
        message: API_RESPONSE.OK_DELETADO,
        data: postDelete,
        total: 1,
        statusCode: API_RESPONSE.STATUS_CODE_OK,
      };

      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  buscarPostPorUsuario = (user_id: number) => {
    try {
      if (posts.length <= 0) {
        return [];
      }

      return posts.filter((post) => post.authorId === user_id);
    } catch (error: any) {
      throw new Error(error);
    }
  };
}
