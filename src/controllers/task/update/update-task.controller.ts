import { Request, Response } from "express";
import { UpdateTaskUseCase } from "../../../usecases/task/update/update-task.usecase";

class UpdateTaskController {
  constructor(private updateTaskUseCase: UpdateTaskUseCase) {}
  
  execute(req: Request, res: Response) {
    const { title, description, done, arquived } = req.body;
    const { userId, id } = req.params;
    
    const { statusCode, body } = this.updateTaskUseCase.execute({
      userId,
      id,
      title,
      description,
      done,
      arquived
    })

    return res.status(statusCode).json(body);
  }
}

export { UpdateTaskController };
