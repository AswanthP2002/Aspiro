export default interface IDeleteSkillsUseCase {
    execute(skillId : string) : Promise<boolean>
}