import Task from "../../../entities/task.entity";
import { HttpResponse, IHttpResponse } from "../../../helpers/http-response";
import { TaskRepository } from "../../../repositories/task/task.repository";
import { UserRepository } from "../../../repositories/user/user.repository";
import { ICreateTaskRequestDTO } from "./create-task.dto";

class CreateTaskUseCase {
  constructor(private userRepository: UserRepository, private taskRepository: TaskRepository) {}

  execute(data: ICreateTaskRequestDTO): IHttpResponse {
    try {
      const { title, description, userId } = data;

      const userFound = this.userRepository.getById(userId);
  
      if (!userFound) {
        throw new Error("Realize o login para concluir está ação.");
      }
  
      const task = new Task(title, description, userId);
      this.taskRepository.create(task);
  
      return HttpResponse.created({
        success: true,
        status: "Tarefa criada com sucesso!",
        body: task
      });
    } catch (error: any) {
      return HttpResponse.badRequest(error);
    }
  }
}

export { CreateTaskUseCase };

