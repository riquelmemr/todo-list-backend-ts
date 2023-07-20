import { randomUUID } from "crypto";

class Task {
  private id: string;
  
  constructor(
    private title: string,
    private description: string,
    private done: boolean,
    private arquived: boolean,
    private createdAt: string,
    private userId: string
  ) {
    this.id = randomUUID();
    this.title = title;
    this.description = description;
    this.done = done;
    this.arquived = arquived;
    this.createdAt = createdAt;
    this.userId = userId;
  }

  public get Id(): string {
    return this.id;
  }
}

export default Task;

