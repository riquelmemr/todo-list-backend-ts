import { HttpResponse } from "../../../helpers/http-response";
import { TaskRepository } from "../../../repositories/task/task.repository";
import { IUpdateTaskRequestDTO } from "./update-task.dto";

class UpdateTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  execute(userId: string, data: IUpdateTaskRequestDTO) {
    try {
      const { id, title, description, done, archived } = data;

      const task = this.taskRepository.getById(id);
  
      if (!task || task.UserId !== userId) {
        throw new Error("Tarefa não encontrada para este usuário.");
      }
  
      const taskUpdated = this.taskRepository.update(id, {
        title: title || task.Title,
        description: description || task.Description,
        done: done !== undefined ? done : task.Done,
        archived: archived !== undefined ? archived : task.Archived
      });
  
      return HttpResponse.ok({
        success: true,
        status: "Tarefa editada com sucesso!",
        body: taskUpdated
      })
    } catch (error: any) {
      return HttpResponse.badRequest(error);
    }
  }
}

export { UpdateTaskUseCase };

