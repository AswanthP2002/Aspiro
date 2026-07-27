export default interface IWithdrawApplicationUsecase {
  execute(applicationId: string, reason: string): Promise<void>;
}
