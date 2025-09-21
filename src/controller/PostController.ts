import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { UserBusiness } from "../business/UserBusiness";

export class PostController {
  postBusiness = new PostBusiness();
  userBusiness = new UserBusiness();

  verificiarPost = (req: Request, res: Response) => {
    try {
      const { title, content, authorId } = req.body;

      if (!title || !content || !authorId) {
        res.status(404).send("Campos faltantes");
      }

      const post = this.postBusiness.verificiarPost(
        title,
        content,
        Number.parseInt(authorId),
        this.userBusiness,
      );

      res.status(200).json(post);
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  buscarTodosPosts = (req: Request, res: Response) => {
    try {
      const posts = this.postBusiness.buscarTodosPosts();
      res.status(200).json(posts);
    } catch (error: any) {
      throw new Error(error);
    }
  };

  patchVerificar = (req: Request, res: Response) => {
    try {
      const id = Number.parseInt(req.params.id);
      const { title, content, published } = req.body;

      if (!id) {
        throw new Error("Campo ID faltando");
      }

      const post = this.postBusiness.patchVerificar(
        id,
        title,
        content,
        published,
      );

      res.status(200).send(post);
    } catch (error: any) {
      throw new Error(error);
    }
  };

  verificarDelete = (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      let header = req.get("User-Id");

      if (!header) {
        res.status(404).send("Usuario Não permitido");
      }

      header = header ? header : "0";

      const postDeleted = this.postBusiness.verificarDelete(
        Number.parseFloat(id),
        Number.parseInt(header),
        this.userBusiness,
      );

      res.status(200).send(postDeleted);
    } catch (error: any) {
      throw new Error(error);
    }
  };
}
