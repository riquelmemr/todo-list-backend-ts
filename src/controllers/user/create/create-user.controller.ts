import { Request, Response } from "express";
import { ICreateUserRequestDTO } from "../../../usecases/user/create/create-user.dto";
import { CreateUserUseCase } from "../../../usecases/user/create/create-user.usecase";

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  execute(req: Request, res: Response)  {
    try {
      const data: ICreateUserRequestDTO = req.body;
      const response = this.createUserUseCase.execute(data);

      return res.status(res.statusCode).json(response.body);
    } catch (error: any) {
      return res.status(res.statusCode).json(error);
    }
  }
}

export { CreateUserController };
