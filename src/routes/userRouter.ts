import express from "express";
import { UserController } from "../controller/UserController";

export const userRouter = express.Router();

const userController = new UserController();

userRouter.get("/", userController.buscarTodosUsuarios);
userRouter.get("/age-range", userController.verifyAgeRange);
userRouter.get("/:id", userController.verifyId);

userRouter.put("/:id", userController.verificarUsuario);
userRouter.delete("/cleanup-inactive", userController.verificarRemocao);
