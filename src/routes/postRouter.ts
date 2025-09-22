import express from "express";
import { PostController } from "../controller/PostController";

export const postRouter = express.Router();

const postController = new PostController();

postRouter.get("/", postController.buscarPosts);

postRouter.post("/", postController.criarPost);
postRouter.patch("/:id", postController.atualizarPostParcialmente);

postRouter.delete("/:id", postController.deletarPostPorId);
