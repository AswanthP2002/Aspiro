export default interface IVerifyBeforePostingJobUsecase {
  execute(userId: string): Promise<boolean>;
}
