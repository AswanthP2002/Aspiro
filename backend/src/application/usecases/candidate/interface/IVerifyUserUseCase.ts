export default interface IVerifyUserUseCase {
    execute(email : string, otp : string) : Promise<boolean>
}