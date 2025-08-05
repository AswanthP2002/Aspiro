export default interface IDeleteResumeUseCase {
    execute(resumeId : string, cloudinaryPublicId : string) : Promise<boolean>
}