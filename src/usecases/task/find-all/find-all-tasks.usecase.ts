import { HttpResponse, IHttpResponse } from "../../../helpers/http-response";
import { TaskRepository } from "../../../repositories/task/task.repository";
import { UserRepository } from "../../../repositories/user/user.repository";
import { IFindAllTasksFilterDTO } from "./find-all-tasks.dto";

class FindAllTasksUseCase {
  constructor(private userRepository: UserRepository, private taskRepository: TaskRepository) {}
  
  execute(userId: string, filters: IFindAllTasksFilterDTO): IHttpResponse {
    try {
      const userFound = this.userRepository.getById(userId);

      if (!userFound) {
        throw new Error("Realize o login ou cadastre-se para buscar tarefas.");
      }
  
      const tasks = this.taskRepository.getAllByUserId(userId, filters);
  
      return HttpResponse.ok({
        success: true,
        status: tasks.length > 0 ? "Tarefas encontradas com sucesso!" : "Nenhuma tarefa cadastrada ou encontrada.",
        body: tasks
      })
    } catch (error: any) {
      return HttpResponse.badRequest(error);
    }
  }
}

export { FindAllTasksUseCase };

