import { users, Post } from "../bd";
import { PostBusiness } from "../business/PostBusiness";

export class UserData {
  buscarUsuarioPorEmail = (email: string) => {
    try {
      const userFound = users.filter((user) => {
        return user.email == email;
      });
      return userFound;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  buscarUsuarioPorId = (id: Number) => {
    try {
      const userFound = users.filter((user) => {
        return user.id === id;
      });
      return userFound;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  buscarUsuarioPorAgeRange = (min: number, max: number) => {
    try {
      console.log(min + "  " + max);

      const userFound = users.filter((user) => {
        return user.idade >= min && user.idade <= max;
      });

      return userFound;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  criarUsuario = (
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
        admin: false,
      };

      users.push(novoUsuario);
      return novoUsuario;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  updateUsuario = (
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

  buscarTodosUsuarios = () => {
    try {
      return users;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  deleteUsersWithoutPost = (postBusiness: PostBusiness) => {
    try {
      let user_posts: Post[] = [];
      let indexes: number[] = [];
      let users_deleted: any[] = [];

      users.forEach((user, index) => {
        user_posts = postBusiness.buscarPostPorUsuario(user.id);
        user_posts.length <= 0 && !user.admin
          ? users_deleted.push(user) && indexes.push(index)
          : "";
      });

      let count = 0;
      indexes.forEach((index) => {
        users.splice(index - count, 1);
        count++;
      });

      return users_deleted;
    } catch (error: any) {
      throw new Error(error);
    }
  };
}
