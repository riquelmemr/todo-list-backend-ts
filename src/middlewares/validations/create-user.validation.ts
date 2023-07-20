import { NextFunction, Request, Response } from "express";

function createUserValidation(req: Request, res: Response, next: NextFunction) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields must be filled" });
  }

  next();
}

export { createUserValidation };
