export default interface IDeleteEducationUseCase {
    execute(educationId : string) : Promise<void>
}