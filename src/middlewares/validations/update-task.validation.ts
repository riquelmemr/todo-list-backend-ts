import { NextFunction, Request, Response } from "express";

function updateTaskValidation(req: Request, res: Response, next: NextFunction) {
  const { title, description, done, arquived } = req.body;

  if (!title && !description && !done && !arquived) {
    return res.status(400).json({ error: "É necessário informar ao menos um campo para atualizar." });
  }

  if (done) {
    if (typeof JSON.parse(done) !== "boolean") {
      return res.status(400).json({ error: "O campo 'done' está inválido." });
    }

    req.body.done = JSON.parse(done);
  }

  if (arquived) {
    if (typeof JSON.parse(arquived) !== "boolean") {
      return res.status(400).json({ error: "O campo 'arquived' está inválido." });
    }

    req.body.arquived = JSON.parse(arquived);
  }

  next();
}

export { updateTaskValidation };

 