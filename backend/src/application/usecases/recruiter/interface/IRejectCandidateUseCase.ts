export default interface IRejectCandidateUseCase {
    execute(applicationId : string, candidateId : string) : Promise<boolean | null>
}