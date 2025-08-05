export default interface ILoadCandidateUseCase {
    execute(search : string, page : number, limit : number, sort : string, filter? : any) : Promise<any>
}