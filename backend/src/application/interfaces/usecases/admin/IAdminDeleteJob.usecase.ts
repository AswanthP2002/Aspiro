export default interface IAdminDeleteJobUsecase {
  execute(id: string): Promise<void>;
}
