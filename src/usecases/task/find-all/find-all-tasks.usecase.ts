import { HttpResponse, IHttpResponse } from "../../../helpers/http-response";
import { TaskRepository } from "../../../repositories/task/task.repository";
import { UserRepository } from "../../../repositories/user/user.repository";

class FindAllTasksUseCase {
  constructor(private userRepository: UserRepository, private taskRepository: TaskRepository) {}
  
  execute(userId: string): IHttpResponse {
    try {
      const userFound = this.userRepository.getById(userId);

      if (!userFound) {
        throw new Error("Realize o login ou cadastre-se para buscar tarefas.");
      }
  
      const tasks = this.taskRepository.getAllByUserId(userId);
  
      return HttpResponse.ok({
        success: true,
        status: "Tarefas encontradas com sucesso!",
        body: tasks
      })
    } catch (error: any) {
      return HttpResponse.badRequest(error);
    }
  }
}

export { FindAllTasksUseCase };

