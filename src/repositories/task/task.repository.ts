import Task from "../../entities/task";
import { BaseRepository } from "../base-repository";

class TaskRepository extends BaseRepository<Task> {
  constructor() {
    super([]);
  }

  getById(id: string): Task | undefined {
    return this.repository.find((item) => item.Id === id);
  }

  getAllByUserId(userId: string): Task[] {
    return this.repository.filter((item) => item.UserId === userId);
  }
}

export { TaskRepository };

