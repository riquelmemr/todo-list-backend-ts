import Task from "../../entities/task.entity";
import { BaseRepository } from "../base-repository";

class TaskRepository extends BaseRepository<Task> {
  constructor() {
    super([]);
  }

  getAllByUserId(userId: string): Task[] {
    return this.repository.filter((item) => item.UserId === userId);
  }
}

export { TaskRepository };

