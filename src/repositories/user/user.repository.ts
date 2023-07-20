import User from "../../entities/user";
import { BaseRepository } from "../base-repository";

class UserRepository extends BaseRepository<User> {
  constructor() {
    super([]);
  }

  getById(id: string): User | undefined {
    return this.repository.find((item) => item.Id === id);
  }
}

export { UserRepository };

