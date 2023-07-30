import { Request, Response } from "express";
import { FindAllTasksUseCase } from "../../../usecases/task";

class FindAllTasksController {
  constructor(private findAllTasksUseCase: FindAllTasksUseCase) {}

  execute(req: Request, res: Response) {
    const { userId } = req.params;
    const { done, archived, title, description } = req.query;
    
    const { statusCode, body } = this.findAllTasksUseCase.execute(userId, {
      done: done ? Boolean(done) : undefined,
      archived: archived ? Boolean(archived) : undefined,
      title: title ? String(title) : undefined,
      description: description ? String(description) : undefined
    });

    return res.status(statusCode).json(body);
  }
}

export { FindAllTasksController };

