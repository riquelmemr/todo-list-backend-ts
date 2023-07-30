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

    if (done) {
      tasks = this.repository.filter((item) => item.Done === done);
    }

    if (archived) {
      tasks = this.repository.filter((item) => item.Archived === archived);
    }

    if (title) {
      tasks = this.repository.filter((item) => item.Title.toLowerCase().includes(title.toLowerCase()));
    }

    if (description) {
      tasks = this.repository.filter((item) => item.Description.toLowerCase().includes(description.toLowerCase()));
    }

    return tasks;
  }
}

export { TaskRepository };

