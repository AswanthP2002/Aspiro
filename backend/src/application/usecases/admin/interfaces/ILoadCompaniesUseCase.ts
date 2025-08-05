export default interface ILoadCompaniesUseCase {
    execute(search : string, page : number, limit : number, sort : string) : Promise<any>
}