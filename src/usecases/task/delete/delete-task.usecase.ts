import { HttpResponse, IHttpResponse } from "../../../helpers/http-response";
import { TaskRepository } from "../../../repositories/task/task.repository";
import { UserRepository } from "../../../repositories/user/user.repository";
import { IDeleteTaskRequestDTO } from "./delete-task.dto";

class DeleteTaskUseCase {
  constructor(private userRepository: UserRepository, private taskRepository: TaskRepository) {}

  execute(data: IDeleteTaskRequestDTO): IHttpResponse {
    try {
      const { id, userId } = data;

      const userFound = this.userRepository.getById(userId);

      if (!userFound) {
        throw new Error("Utilize um email válido ou cadastre-se para deletar tarefas.");
      }

      const task = this.taskRepository.getById(id);

      if (!task || task.UserId !== userId) {
        throw new Error("Tarefa não encontrada para este usuário.");
      }
  
      this.taskRepository.delete("Id", id);
  
      return HttpResponse.ok({
        success: true,
        status: "Tarefa deletada com sucesso!",
        body: task
      })
    } catch (error: any) {
      return HttpResponse.badRequest(error);
    }
  }
}

export { DeleteTaskUseCase };

