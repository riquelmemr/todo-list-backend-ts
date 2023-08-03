import { NextFunction, Request, Response } from "express";
import { userRepository } from "../../main";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const { userId } = req.params;

  const userFound = userRepository.getById(userId);

  if (!userFound) {
    return res.status(400).json({ error: "Realize o login ou crie sua conta para realizar essa operação." });
  }

  next();
}