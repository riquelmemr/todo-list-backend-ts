interface IBaseRepository<T> {
  create(item: T): T;
  getByOne(key: string, value: string): T | undefined;
  update(id: string, item: any): T;
  delete(key: string, value: string): void;
}

export { IBaseRepository };

