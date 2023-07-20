import User from "../../../entities/user";
import { HttpResponse, IHttpResponse } from "../../../helpers/http-response";
import { UserRepository } from "../../../repositories/user/user.repository";
import { ICreateUserRequestDTO } from "./create-user.dto";

class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  execute(data: ICreateUserRequestDTO): IHttpResponse {
    const { name, email, password } = data;
    console.log(data);

    const userFound = this.userRepository.getByOne("email", email);

    if (userFound) {
      throw new Error("User already exists");
    }

    const user = new User(name, email, password);
    const userCreated = this.userRepository.create(user);

    return HttpResponse.created({
      success: true,
      status: 201,
      body: userCreated
    });
  }
}

export { CreateUserUseCase };

