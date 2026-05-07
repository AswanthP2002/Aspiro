export default interface IVerifyBeforeEditJobUsecase {
  execute(userId: string): Promise<boolean>;
}
