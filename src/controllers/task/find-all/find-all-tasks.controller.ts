import { Request, Response } from "express";
import { FindAllTasksUseCase } from "../../../usecases/task";

class FindAllTasksController {
  constructor(private findAllTasksUseCase: FindAllTasksUseCase) {}

  execute(req: Request, res: Response) {
    const { userId } = req.params;
    const { statusCode, body } = this.findAllTasksUseCase.execute(userId);

    return res.status(statusCode).json(body);
  }
}

export { FindAllTasksController };
