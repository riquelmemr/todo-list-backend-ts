 import { HttpResponse, IHttpResponse } from "../../../helpers/http-response";
import { TaskRepository } from "../../../repositories/task/task.repository";
import { IDeleteTaskRequestDTO } from "./delete-task.dto";

class DeleteTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  execute(data: IDeleteTaskRequestDTO): IHttpResponse {
    try {
      const { id, userId } = data;

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

