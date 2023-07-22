import { HttpResponse } from "../../../helpers/http-response";
import { TaskRepository } from "../../../repositories/task/task.repository";
import { UserRepository } from "../../../repositories/user/user.repository";
import { IUpdateUserRequestDTO } from "./update-task.dto";

class UpdateTaskUseCase {
  constructor(private userRepository: UserRepository, private taskRepository: TaskRepository) {}

  execute(data: IUpdateUserRequestDTO) {
    try {
      const { userId, id, title, description, done, arquived } = data;

      const userFound = this.userRepository.getById(userId);
  
      if (!userFound) {
        throw new Error("Realize o login ou cadastre-se para editar uma tarefa.");
      }
  
      const task = this.taskRepository.getById(id);
  
      if (!task || task.UserId !== userId) {
        throw new Error("Tarefa não encontrada para este usuário.");
      }
  
      const taskUpdated = this.taskRepository.update(id, {
        title: title || task.Title,
        description: description || task.Description,
        done: done || task.Done,
        arquived: arquived || task.Arquived
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
