export default interface IDeleteSkillsUseCase {
    execute(id : string) : Promise<void>
}