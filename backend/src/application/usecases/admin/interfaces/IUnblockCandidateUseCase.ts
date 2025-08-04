export default interface IUnblockCandidateUseCase {
    execute(id : string) : Promise<boolean>
}