export default interface IBaseRepo<T> {
  create(entity: T): Promise<T | null>;
  findById(id: string): Promise<T | null>;
  // readAll() : Promise<T[] | null>
  // readById(id : string) : Promise<T | null>
  update(id?: string, updateEntity?: T): Promise<T | null>;
  delete(id: string): Promise<void>;
}
