import { Request, Response } from "express";
import { ILoginUserRequestDTO } from "../../../usecases/user/login/login-user.dto";
import { LoginUserUseCase } from "../../../usecases/user/login/login-user.usecase";

class LoginUserController {
  constructor(private loginUserUseCase: LoginUserUseCase) {}

  execute(req: Request, res: Response) {
    const data: ILoginUserRequestDTO = req.body;
    const { statusCode, body } = this.loginUserUseCase.execute(data);

    return res.status(statusCode).json(body);
  }
}

export { LoginUserController };

