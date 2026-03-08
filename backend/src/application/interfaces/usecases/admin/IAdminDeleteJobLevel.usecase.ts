export default interface IAdminDeleteJobLevelUsecase {
  execute(id: string): Promise<void>;
}
