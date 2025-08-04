export default interface ILoadJobCandidateSideUseCase {
    execute(search : string, page : number, limit : number, sort : string, filters : any) : Promise<any>
}