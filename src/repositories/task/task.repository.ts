import Task from "../../entities/task.entity";
import { IFindAllTasksFilterDTO } from "../../usecases/task/find-all/find-all-tasks.dto";
import { BaseRepository } from "../base-repository";

class TaskRepository extends BaseRepository<Task> {
  constructor() {
    super([]);
  }

  getAllByUserId(userId: string, filters: IFindAllTasksFilterDTO): Task[] {
    const { done, archived, title, description } = filters;
    let tasks = this.repository.filter((item) => item.UserId === userId);

    if (done !== undefined) {
      tasks = tasks.filter((item) => item.Done === done);
    }

    if (archived !== undefined) {
      tasks = tasks.filter((item) => item.Archived === archived);
    }

    if (title) {
      tasks = tasks.filter((item) => item.Title.toLowerCase().includes(title.toLowerCase()));
    }

    if (description) {
      tasks = tasks.filter((item) => item.Description.toLowerCase().includes(description.toLowerCase()));
    }

    return tasks;
  }
}

export { TaskRepository };

