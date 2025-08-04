export default interface ILoginCandidateUseCase {
    execute(email : string, password : string) : Promise<Object>
}