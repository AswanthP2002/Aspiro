export default interface IDeleteUserSkillUsecase {
  execute(skillId: string): Promise<void>;
}
