import { UserData } from "../data/UserData";
import { PostBusiness } from "./PostBusiness";

export class UserBusiness {
  userData = new UserData();

  verify = (email: string) => {
    try {
      if (!email) {
        throw new Error("Campos faltantes");
      }

      const user = this.userData.buscarUsuarioPorEmail(email) as any;
      if (!user) {
        throw new Error("Usuario inexistente");
      }

      return user;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  verifyId = (id: number) => {
    try {
      const user = this.userData.buscarUsuarioPorId(id) as any;
      let response = {};

      if (!user) {
        return (response = {
          success: false,
          message: "Usuario não existe",
          data: user,
          total: 1,
        });
      }

      return (response = {
        success: false,
        message: "Operação feita com sucesso",
        data: user,
        total: 1,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  };

  verifyAgeRange = (min: number, max: number) => {
    try {
      if (!min && !max) {
        throw new Error("Campos Faltante");
      }

      if (min < 0 || max < 0) {
        throw new Error("Campo min ou max não e valido: < 0");
      }

      if (!max && min) {
        max = 999;
      }

      if (!min || max) {
        min = -999;
      }

      const user = this.userData.buscarUsuarioPorAgeRange(min, max) as any;

      if (!user) {
        throw new Error("Usuario inexistente");
      }

      return user;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  verificarUsuario = (
    id: number,
    name: string,
    email: string,
    senha: string,
    idade: number,
  ) => {
    try {
      if (
        name.length <= 0 ||
        email.length <= 0 ||
        senha.length <= 0 ||
        idade <= 0
      ) {
        throw new Error("Algum campos e menor que 0 ou tem o tamanho de 0");
      }

      const userExist = this.userData.buscarUsuarioPorId(id);
      const emailExist = this.userData.buscarUsuarioPorEmail(email);

      //console.log(userExist);

      if (!userExist || userExist.length <= 0) {
        console.log("Usuario não existe, criando...");

        if (emailExist.length > 0) {
          console.log("Email ja existe");
          throw new Error("Email ja existe");
        }

        return this.userData.criarUsuario(name, email, senha, idade);
      }

      if (emailExist.length > 0 && userExist[0].email != emailExist[0].email) {
        console.log("Email ja existe");
        throw new Error("Email ja existe");
      }

      return this.userData.updateUsuario(id, name, email, senha, idade);
    } catch (error: any) {
      throw new Error(error);
    }
  };

  buscarTodosUsuarios = () => {
    try {
      const users = this.userData.buscarTodosUsuarios();

      if (!users || users.length <= 0) {
        throw new Error("Sem usuarios");
      }

      return users;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  verifidcarRemocao = (condicional: boolean, postBusiness: PostBusiness) => {
    try {
      if (condicional == false) {
        throw new Error("Operação não foi confirmada");
      }

      const users_deleted = this.userData.deleteUsersWithoutPost(postBusiness);

      return users_deleted;
    } catch (error: any) {
      throw new Error(error);
    }
  };
}
