export default interface IGetCandidateDetailsUseCase {
    execute(candidateId : string) : Promise<any[] | null>
}