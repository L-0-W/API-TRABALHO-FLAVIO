import express from "express";
import { UserController } from "../controller/UserController";

export const userRouter = express.Router();

const userController = new UserController();

userRouter.get("/", userController.buscarTodosUsuarios);
userRouter.get("/age-range", userController.buscarUsuariosPorFaixaEtaria);
userRouter.get("/:id", userController.buscarUsuarioPorId);

userRouter.put("/:id", userController.atualizarUsuarioPorId);
userRouter.delete("/cleanup-inactive", userController.deletarUsuariosSemPosts);
