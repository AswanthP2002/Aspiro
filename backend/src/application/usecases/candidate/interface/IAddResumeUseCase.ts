export default interface IAddResumeUseCase {
    execute(file : any, path : string, candidateId : string) : Promise<string | null>
}