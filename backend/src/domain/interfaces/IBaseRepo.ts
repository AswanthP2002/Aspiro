import { OptionalUnlessRequiredId } from "mongodb";

export default interface IBaseRepo<T>{
     create(entity : T) : Promise<T | null> 
     delete(id : string) : Promise<void>
}