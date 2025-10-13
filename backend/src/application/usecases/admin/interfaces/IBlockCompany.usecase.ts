export default interface IBlockCompanyUseCase {
    execute(id : string) : Promise<boolean>
}