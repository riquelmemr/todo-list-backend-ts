interface IBaseRepository<T> {
  create(body: T): T;
  getByOne(key: string, value: string): T | undefined;
  getAll(): T[];
  update(key: string, value: string, body: T): T;
  delete(key: string, value: string): void;
}

export { IBaseRepository };
