import { users } from "../bd";
import { PostBusiness } from "../business/PostBusiness";
import { ApiResponse, Post, User } from "../Interfaces";
import { user_db_connection } from "./DatabaseConnection";

export class UserData {
  consultarBancoUsuarioPorEmail = (email: string) => {
    try {
      const userFound = users.filter((user) => {
        return user.email == email;
      });
      return userFound;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  consultarBancoUsuarioPorId = async (id: Number) => {
    try {
      const resposta: User[] = await this.consultarTodosUsuarios();


      const userFound: User[] = resposta.filter((user: User) => {
        return user.id === id;
      });


      return userFound;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  consultarBancoUsuariosPorFaixaEtaria = (min: number, max: number) => {
    try {
      console.log("Procurando usuario...");

      const userFound = users.filter((user) => {
        return user.idade >= min && user.idade <= max;
      });

      console.log("Enviando Resposta de userData....");
      return userFound;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  inserirNovoUsuario = (
    name: string,
    email: string,
    senha: string,
    idade: number,
  ) => {
    try {
      let menorId = 1;

      users.forEach((user) => {
        console.log(user.id + "   " + menorId);
        user.id > menorId ? (menorId = user.id) : (menorId = menorId);
      });

      menorId++;

      const novoUsuario = {
        id: menorId,
        name: name,
        senha: senha,
        email: email,
        idade: idade,
        role: "false",
      };

      users.push(novoUsuario);
      return novoUsuario;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  salvarAtualizacaoUsuario = (
    id: number,
    name: string,
    email: string,
    senha: string,
    idade: number,
  ) => {
    try {
      users
        .filter((user) => user.id === id)
        .map((user) => {
          user.name = name;
          user.idade = idade;
          user.senha = senha;
          user.email = email;
        });

      return users.filter((user) => user.id === id);
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  consultarTodosUsuarios = async () => {
    try {
      return await user_db_connection('users').select('*');
    } catch (error: any) {
      throw new Error(error);
    }
  };

  consultarUsuarioTemPost = (user_id: number, postBusiness: PostBusiness) => {
    try {
      postBusiness.obterTodosPosts().data.forEach((post) => {
        if (post.authorId === user_id) {
          console.log("TRUEEEEEEEEEeeee");
          return true;
        }
      });

      return false;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  removerUsuario = (user_id: number, postBusiness: PostBusiness) => {
    try {
      const index = users.findIndex((user) => user.id === user_id);
      const user_return = users[index];

      users.splice(index, 1);
      return user_return;
    } catch (error: any) {
      throw new Error(error);
    }
  };
}
