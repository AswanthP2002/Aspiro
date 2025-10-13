export default interface IDeletePos {
    execute(id : string, creatorId : string) : Promise<void>
}