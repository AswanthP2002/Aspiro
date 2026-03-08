export default interface IAdminDeleteWorkModeUsecase {
  execute(id: string): Promise<void>;
}
