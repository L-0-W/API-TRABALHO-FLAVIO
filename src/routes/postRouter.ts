import express from "express";
import { PostController } from "../controller/PostController";

export const postRouter = express.Router();

const postController = new PostController();

postRouter.get("", postController.buscarTodosPosts);

postRouter.post("", postController.verificiarPost);
postRouter.patch("/:id", postController.patchVerificar);

postRouter.delete("/:id", postController.verificarDelete);
