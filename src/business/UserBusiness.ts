import { API_RESPONSE } from "../API_RESPONSE";
import { UserData } from "../data/UserData";
import { ApiResponse, User } from "../Interfaces";
import { PostBusiness } from "./PostBusiness";

export class UserBusiness {
  userData = new UserData();

  verify = (email: string) => {
    try {
      if (!email) {
        throw new Error("Campos faltantes");
      }

      const user = this.userData.consultarBancoUsuarioPorEmail(email) as any;
      if (!user) {
        throw new Error("Usuario inexistente");
      }

      return user;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  obterUsuarioPorId = (id: number) => {
    try {
      let response: ApiResponse<User>;

      console.log(id + "Verificando se ID e vazio....");
      if (!id && id != 0) {
        console.log("ID e vazio, retornando messagem....");
        response = {
          success: false,
          message: API_RESPONSE.PARAMETRO_FALTANDO_MESSAGE,
          data: [],
          total: 0,
          statusCode: API_RESPONSE.STATUS_CODE_DADOS_INVALIDOS,
        };

        return response;
      }

      console.log("Verificando se ID e <= 0....");
      if (id <= 0) {
        console.log("ID e <= 0, retornando messagem....");
        response = {
          success: false,
          message: API_RESPONSE.PARAMETRO_TAMANHO_INCORRETO,
          data: [],
          total: 0,
          statusCode: API_RESPONSE.STATUS_CODE_DADOS_INVALIDOS,
        };

        return response;
      }

      console.log("Fazendo consulta de usuario....");
      const user = this.userData.consultarBancoUsuarioPorId(id) as any;

      console.log("Verificando se resposta de consulta esta vazio....");
      if (!user) {
        console.log("Consulta retornou vazio, retornando messagem....");
        response = {
          success: true,
          message: API_RESPONSE.VAZIO_MESSAGE,
          data: [],
          total: 0,
          statusCode: API_RESPONSE.STATUS_CODE_OK,
        };

        return response;
      }

      console.log("Tudo Ok, retornando messagem....");
      response = {
        success: true,
        message: API_RESPONSE.OK_MESSAGE,
        data: user,
        total: 1,
        statusCode: API_RESPONSE.STATUS_CODE_OK,
      };

      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  obterUsuariosPorFaixaEtaria = (min: number, max: number) => {
    try {
      let response: ApiResponse<User>;

      if (!min && !max) {
        response = {
          success: false,
          message: API_RESPONSE.PARAMETRO_FALTANDO_MESSAGE,
          data: [],
          total: 0,
          statusCode: API_RESPONSE.STATUS_CODE_DADOS_INVALIDOS,
        };

        return response;
      }

      if (min < 0 || max < 0) {
        response = {
          success: false,
          message: API_RESPONSE.PARAMETRO_TAMANHO_INCORRETO,
          data: [],
          total: 0,
          statusCode: API_RESPONSE.STATUS_CODE_DADOS_INVALIDOS,
        };

        return response;
      }

      if (!max && min) {
        console.log("Não foi especificado o maximo.....");
        console.log("Colocando maximo para 999");

        max = 999;
      }

      if (!min && max) {
        console.log("Não foi especificado o minimo.....");
        console.log("Colocando minimo para -999");

        min = -999;
      }

      const user = this.userData.consultarBancoUsuariosPorFaixaEtaria(
        min,
        max,
      ) as any;

      if (!user || user.length <= 0) {
        response = {
          success: true,
          message: API_RESPONSE.VAZIO_MESSAGE,
          data: [],
          total: 0,
          statusCode: API_RESPONSE.STATUS_CODE_OK,
        };

        return response;
      }

      response = {
        success: true,
        message: API_RESPONSE.OK_MESSAGE,
        data: user,
        total: user.length,
        statusCode: API_RESPONSE.STATUS_CODE_OK,
      };

      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  atualizarUsuario = (
    id: number,
    name: string,
    email: string,
    senha: string,
    idade: number,
  ) => {
    try {
      let response: ApiResponse<User>;

      console.log("Verificando se parametros existe....");
      if (!id || !name || !email || !senha || !idade) {
        console.log("Parametros não existe, retornando messagem.....");
        response = {
          success: false,
          message: API_RESPONSE.PARAMETRO_FALTANDO_MESSAGE,
          data: [],
          total: 0,
          statusCode: API_RESPONSE.STATUS_CODE_DADOS_INVALIDOS,
        };

        return response;
      }

      console.log("Verificando se usuario existe....");
      const userExist = this.userData.consultarBancoUsuarioPorId(id);

      console.log("Verificando se email existe....");
      const emailExist = this.userData.consultarBancoUsuarioPorEmail(email);

      console.log("Verificando se consulta retornou vazio....");

      if (userExist.length <= 0) {
        console.log("Usuario não existe, criando...");

        console.log("Verificando se email para cadastrar ja existe");
        if (emailExist.length > 0) {
          console.log("Email ja existe...");

          response = {
            success: false,
            message: API_RESPONSE.VALOR_JA_EXISTE + ": " + "Email",
            data: [],
            total: 0,
            statusCode: API_RESPONSE.STATUS_CODE_JA_EXISTE,
          };

          console.log("Enviando mensagem...");
          return response;
        }

        console.log("Enviando resposta....");
        const ususario_criado = this.userData.inserirNovoUsuario(
          name,
          email,
          senha,
          idade,
        );

        response = {
          success: true,
          message: API_RESPONSE.OK_CRIADO,
          data: [ususario_criado],
          total: 1,
          statusCode: API_RESPONSE.STATUS_CODE_CRIADO,
        };

        return response;
      }

      console.log(
        "Verificando se email ja existe e não e o mesmo email do usuario....",
      );

      if (emailExist.length > 0 && userExist[0].email != emailExist[0].email) {
        console.log("Email ja existe");

        response = {
          success: false,
          message: API_RESPONSE.VALOR_JA_EXISTE + ": " + "Email",
          data: [],
          total: 0,
          statusCode: API_RESPONSE.STATUS_CODE_JA_EXISTE,
        };

        return response;
      }

      const usuario_atualizado = this.userData.salvarAtualizacaoUsuario(
        id,
        name,
        email,
        senha,
        idade,
      );

      response = {
        success: true,
        message: API_RESPONSE.OK_ATUALIZADO,
        data: usuario_atualizado,
        total: 0,
        statusCode: API_RESPONSE.STATUS_CODE_OK,
      };

      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  obterTodosUsuarios = () => {
    try {
      console.log("Consultando todos os usuarios...");
      const users = this.userData.consultarTodosUsuarios();
      let response: ApiResponse<User>;

      console.log("Verificando se consulta retornou vazio...");
      if (!users || users.length <= 0) {
        console.log("Consulta retornou vazio, retornando messagem");
        response = {
          success: true,
          message: API_RESPONSE.VAZIO_MESSAGE,
          data: [],
          total: 0,
          statusCode: API_RESPONSE.STATUS_CODE_OK,
        };

        return response;
      }

      console.log("Retornando resposta");
      response = {
        success: true,
        message: "Operação feita com sucesso",
        data: users,
        total: users.length,
        statusCode: API_RESPONSE.STATUS_CODE_OK,
      };

      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  removerUsuariosSemPosts = (
    condicional?: string,
    postBusiness?: PostBusiness,
  ) => {
    try {
      let response: ApiResponse<User>;

      if (!postBusiness) {
        throw new Error("Server Error");
      }

      console.log(condicional + "Verificando se parametro e vazio....");
      if (!condicional) {
        console.log("Parametro e vazio, retornando messagem....");
        response = {
          success: false,
          message: API_RESPONSE.PARAMETRO_FALTANDO_MESSAGE + ": " + "confirm",
          data: [],
          total: 0,
          statusCode: API_RESPONSE.STATUS_CODE_DADOS_INVALIDOS,
        };

        return response;
      }

      if (condicional != "true" && condicional != "false") {
        console.log("Parametro incorreto, true ou false");
        response = {
          success: false,
          message: API_RESPONSE.PARAMETRO_INVALIDO + ": " + "confirm",
          data: [],
          total: 0,
          statusCode: API_RESPONSE.STATUS_CODE_DADOS_INVALIDOS,
        };

        return response;
      }

      console.log("Verificando se operação foi confirmada...");
      if (condicional == "false") {
        console.log("Operação não confirmada, retornando messagem...");
        response = {
          success: false,
          message: API_RESPONSE.OPERACAO_CANCELADA,
          data: [],
          total: 0,
          statusCode: API_RESPONSE.STATUS_CODE_OK,
        };

        return response;
      }

      let users_deleted: any[] = [];

      console.log("Verificando os usuarios...");

      const users = this.userData.consultarTodosUsuarios();
      for (let i = 0; i < users.length; i++) {
        if (!this.userData.consultarUsuarioTemPost(users[i].id, postBusiness)) {
          users_deleted.push(
            this.userData.removerUsuario(users[i - i].id, postBusiness),
          );
          i--;
        }
      }

      console.log("Verificando se consulta esta vazio....");
      if (users_deleted.length <= 0) {
        console.log("Consulta esta vazio, retornando messagem....");
        response = {
          success: true,
          message: API_RESPONSE.VAZIO_MESSAGE,
          data: [],
          total: 0,
          statusCode: API_RESPONSE.STATUS_CODE_OK,
        };

        return response;
      }

      console.log("Retornando resposta....");
      response = {
        success: true,
        message: API_RESPONSE.OK_DELETADO,
        data: users_deleted,
        total: 0,
        statusCode: API_RESPONSE.STATUS_CODE_OK,
      };

      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  };
}
