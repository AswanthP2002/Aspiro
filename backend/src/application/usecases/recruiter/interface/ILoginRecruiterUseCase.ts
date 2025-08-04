export default interface ILoginRecruiterrUseCase {
    execute(email : string, password : string) : Promise<object>
}