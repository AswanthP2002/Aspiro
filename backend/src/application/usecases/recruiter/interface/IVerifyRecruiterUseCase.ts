export default interface IVerifyRecruiterUseCase {
    execute(email : string, otp : string) : Promise<Boolean>
}