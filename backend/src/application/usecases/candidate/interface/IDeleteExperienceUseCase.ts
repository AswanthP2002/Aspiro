export default interface IDeleteExperienceUseCase {
    execute(experienceId : string) : Promise<boolean>
}