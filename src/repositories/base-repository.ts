import { IBaseRepository } from "./base-repository.interface";

class BaseRepository<T> implements IBaseRepository<T> {
  constructor(protected repository: Array<T>) {
    this.repository = repository;
  }

  create(body: T): T {
    this.repository.push(body);
    return body;
  }

  getByOne(key: string, value: string): T | undefined {
    const item = this.repository.find((item) => item[key as keyof T] === value);
    return item || undefined;
  }

  getAll(): T[] {
    return this.repository;
  }

  update(key: string, value: string, item: T): T {
    const itemFound = this.repository.findIndex((item) => item[key as keyof T] === value);
    this.repository[itemFound] = item;

    return item;
  }

  delete(key: string, value: string): void {
    const itemFound = this.repository.findIndex((item) => item[key as keyof T] === value);
    this.repository.splice(itemFound, 1);
  }
}

export { BaseRepository };
