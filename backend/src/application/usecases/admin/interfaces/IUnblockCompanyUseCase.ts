export default interface IUnblockCompanyUseCase {
    execute(id : string) : Promise<boolean>
}