import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { PostBusiness } from "../business/PostBusiness";

export class UserController {
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

  verifyId = (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      console.log("Verificando se parametro ID existe....");
      if (!id) {
        console.log("Parametro não existe");
        res.status(400);
        throw new Error("ID e Obrigatorio");
      }

      console.log("buscando usuario por ID!");
      const response = this.userBusiness.verifyId(Number(id));

      console.log("Verificando se retorno e nulo!");

      if (!response.success) {
        res.status(404).json(response);
        throw new Error("Usuario Não Encontrado");
      }

      console.log("Retornando");
      res.status(200).json(response);
    } catch (error: any) {
      res.send(error.sqlMessage || error.message);
    }
  };

  verifyAgeRange = (req: Request, res: Response) => {
    try {
      const min = req.query.min;
      const max = req.query.max;

      const user = this.userBusiness.verifyAgeRange(Number(min), Number(max));

      if (user.length <= 0) {
        res.status(404).json(user);
      }

      res.status(200).json(user);
    } catch (error: any) {
      res.status(404);
      res.send(error.sqlMessage || error.message);
    }
  };

  buscarTodosUsuarios = (req: Request, res: Response) => {
    try {
      const users = this.userBusiness.buscarTodosUsuarios();
      res.status(200).json(users);
    } catch (error: any) {
      throw new Error(error);
    }
  };

  verificarUsuario = (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const { name, email, senha, idade } = req.body;

      if (!id || !name || !email || !senha || !idade) {
        res.status(404).send("Cmapos faltando");
      }

      const user = this.userBusiness.verificarUsuario(
        Number.parseInt(id),
        name,
        email,
        senha,
        idade,
      );

      console.log(user);
      res.status(200).json(user);
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  verificarRemocao = (req: Request, res: Response) => {
    try {
      const condicional = req.query.confirm;

      console.log("Condicional: " + condicional);

      if (!condicional) {
        res.status(404).send("Campo faltando");
      }

      const users_deleted = this.userBusiness.verifidcarRemocao(
        Boolean(condicional),
        this.postBusiness,
      );
      res.status(200).send(users_deleted);
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };
}
