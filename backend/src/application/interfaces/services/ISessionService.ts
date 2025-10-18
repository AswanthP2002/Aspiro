export default interface ISessionService {
    set(key : string, value : string) : void
    get<T>(key : T) : T
    remove(key : string) : void
}