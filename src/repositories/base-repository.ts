import { capitalize } from "../helpers/capitalize";
import { IBaseRepository } from "./base-repository.interface";

abstract class BaseRepository<T> implements IBaseRepository<T> {
  constructor(protected repository: T[]) {
    this.repository = repository;
  }

  create(item: T): T {
    this.repository.push(item);
    return item;
  }

  getById(id: string): T | undefined {
    return this.repository.find((item) => item["Id" as keyof T] === id);
  }

  getByOne(key: string, value: string): T | undefined {
    const item = this.repository.find((item) => item[key as keyof T] === value);
    return item || undefined;
  }

  update(id: string, item: any): T {
    const indexFound = this.repository.findIndex((item) => item["Id" as keyof T] === id);
    const keys = Object.keys(item);

    for (const key of keys) {
      this.repository[indexFound][capitalize(key) as keyof T] = item[key];
    }

    return this.repository[indexFound];
  }

  delete(key: string, value: string): void {
    const itemFound = this.repository.findIndex((item) => item[key as keyof T] === value);
    this.repository.splice(itemFound, 1);
  }
}

export { BaseRepository };

