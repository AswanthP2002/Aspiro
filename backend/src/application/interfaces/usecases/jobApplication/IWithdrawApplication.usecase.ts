export default interface IWithdrawApplicationUsecase {
  execute(applicationId: string): Promise<void>;
}
