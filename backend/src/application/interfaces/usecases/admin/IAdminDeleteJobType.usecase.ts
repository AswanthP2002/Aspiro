export default interface IAdminDeleteJobTypeUsecase {
  execute(id: string): Promise<void>;
}
