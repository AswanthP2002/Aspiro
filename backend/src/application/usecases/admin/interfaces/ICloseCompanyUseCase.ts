export default interface ICloseCompanyUseCase {
    execute(id : string) : Promise<boolean>
}