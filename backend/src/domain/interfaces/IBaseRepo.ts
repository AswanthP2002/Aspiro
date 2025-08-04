import { OptionalUnlessRequiredId } from "mongodb";

export default interface IBaseRepo<T>{
     create(data : OptionalUnlessRequiredId<T>) : Promise<string | null> 
     findAll(id : string) : Promise<any[] | null>
     delete(id : string) : Promise<boolean>
}