export default interface IAdminLoginUseCase {
    execute(email : string, password : string) : Promise<Object>
}