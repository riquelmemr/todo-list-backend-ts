import { randomUUID } from 'crypto';

class User {
  private id: string;
  private createdAt: string

  constructor(
    private name: string,
    private email: string,
    private password: string,
  ) {
    this.id = randomUUID();
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = new Date().toLocaleDateString('pt-BR');
  }

  public get Id(): string {
    return this.id;
  }
}

export default User;