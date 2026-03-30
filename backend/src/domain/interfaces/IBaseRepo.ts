export default interface IBaseRepo<T> {
  create(entity: T): Promise<T | null>;
  findById(id: string): Promise<T | null>;
  find(): Promise<T[] | null>;
  update(id: string, updateEntity: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<void>;
  deleteAll(): Promise<void>;
}
