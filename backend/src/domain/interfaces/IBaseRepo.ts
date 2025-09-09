import { OptionalUnlessRequiredId } from "mongodb";

export default interface IBaseRepo<T>{
     create(entity : T) : Promise<T | null> 
     findWithCandidateId(id : string) : Promise<T[] | null>
     delete(id : string) : Promise<void>
}