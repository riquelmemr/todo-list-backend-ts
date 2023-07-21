import { NextFunction, Request, Response } from "express";
import { regexEmail } from "../../helpers/validations";

function createUserValidation(req: Request, res: Response, next: NextFunction) {
  const { name, email, password } = req.body;

  if (!name) {
    return res.status(400).json({ error: "O campo 'name' é obrigatório." });
  }

  if (!email || !regexEmail.test(email)) {
    return res.status(400).json({ error: "O campo 'email' está vazio ou inválido." });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({ error: "O campo 'password' está vazio ou tem menos de 6 caracteres." });
  }

  next();
}

export { createUserValidation };

