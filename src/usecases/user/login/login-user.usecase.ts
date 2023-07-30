import { HttpResponse, IHttpResponse } from "../../../helpers/http-response";
import { UserRepository } from "../../../repositories/user/user.repository";
import { ILoginUserRequestDTO, ILoginUserResponseDTO } from "./login-user.dto";

class LoginUserUseCase {
  constructor(private userRepository: UserRepository) {}

  execute(data: ILoginUserRequestDTO): IHttpResponse {
    try {
      const { email, password } = data;

      const userFound = this.userRepository.getByOne("email", email);
  
      if (!userFound) {
        throw new Error("Utilize um email válido ou cadastre-se.");
      }

      const matchPassword = userFound.Password === password;

      if (!matchPassword) {
        throw new Error("Email e/ou senha inválidos!");
      }

      const body: ILoginUserResponseDTO = {
        id: userFound.Id,
        name: userFound.Name,
        email: userFound.Email,
      }

      return HttpResponse.ok({
        success: true,
        status: "Usuário logado com sucesso!",
        body
      })
    } catch (error: any) {
      return HttpResponse.badRequest(error);
    }
  }
}

export { LoginUserUseCase };

