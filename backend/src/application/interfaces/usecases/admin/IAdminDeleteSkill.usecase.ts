export default interface IAdminDeleteSkillUsecase {
  execute(id: string): Promise<void>;
}
