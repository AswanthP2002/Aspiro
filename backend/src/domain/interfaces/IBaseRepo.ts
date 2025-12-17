export default interface IBaseRepo<T> {
  create(entity: T): Promise<T | null>;
  findById(id: string): Promise<T | null>;
  find(): Promise<T[] | null>
  // readAll() : Promise<T[] | null>
  // readById(id : string) : Promise<T | null>
  update(id: string, updateEntity: Partial<T>): Promise<T | null>; //making update data partial //checking any errors
  delete(id: string): Promise<void>;
}
