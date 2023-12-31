import { randomUUID } from "crypto";

class Task {
  private id: string;
  private done: boolean;
  private archived: boolean;
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
    this.archived = false;
    this.createdAt = new Date().toLocaleDateString('pt-BR');
    this.userId = userId;
  }

  public get Id(): string {
    return this.id;
  }

  public get Title(): string {
    return this.title;
  }

  public get Description(): string {
    return this.description;
  }

  public get Done(): boolean {
    return this.done;
  }

  public get Archived(): boolean {
    return this.archived;
  }

  public get UserId(): string {
    return this.userId;
  }

  public get CreatedAt(): string {
    return this.createdAt;
  }

  public set Title(title: string) {
    this.title = title;
  }

  public set Description(description: string) {
    this.description = description;
  }

  public set Done(done: boolean) {
    this.done = done;
  }

  public set Archived(archived: boolean) {
    this.archived = archived;
  }
}

export default Task;

