import { Request, Response } from "express";
import { DeleteTaskUseCase } from "../../../usecases/task";

class DeleteTaskController {
  constructor(private deleteTaskUseCase: DeleteTaskUseCase) {}

  execute(req: Request, res: Response) {
    const { id, userId } = req.params;
    const { statusCode, body } = this.deleteTaskUseCase.execute({
      id,
      userId
    });
    
    return res.status(statusCode).json(body);
  }
}

export { DeleteTaskController };

