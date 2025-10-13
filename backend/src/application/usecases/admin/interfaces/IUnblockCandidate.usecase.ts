export default interface IUnblockCandidateUseCase {
    execute(userId : string) : Promise<boolean>
}