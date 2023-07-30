import User from "../../../entities/user.entity";
import { HttpResponse, IHttpResponse } from "../../../helpers/http-response";
import { UserRepository } from "../../../repositories/user/user.repository";
import { ICreateUserRequestDTO } from "./create-user.dto";

class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  execute(data: ICreateUserRequestDTO): IHttpResponse {
    try {
      const { name, email, password } = data;
      
      const userFound = this.userRepository.getByOne("email", email);
  
      if (userFound) {
        throw new Error("Já existe um usuário com esse email! Tente outro.");
      }
  
      const user = new User(name, email, password);
      this.userRepository.create(user);
  
      return HttpResponse.created({
        success: true,
        status: "Usuário criado com sucesso!",
        body: {
          id: user.Id,
          name: user.Name,
          email: user.Email,
        }
      });
    } catch (error: any) {
      return HttpResponse.badRequest(error);
    }
  }
}

export { CreateUserUseCase };

