import { randomUUID } from "crypto";

class Task {
  private id: string;
  private done: boolean;
  private arquived: boolean;
  private createdAt: string;
  
  constructor(
    private title: string,
    private description: string,
    private userId: string
  ) {
    this.id = randomUUID();
    this.title = title;
    this.description = description;
    this.done = false;
    this.arquived = false;
    this.createdAt = new Date().toLocaleDateString('pt-BR');
    this.userId = userId;
  }

  public get Id(): string {
    return this.id;
  }

  public get UserId(): string {
    return this.userId;
  }
}

export default Task;

