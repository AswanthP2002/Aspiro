export default interface IVerifyBeforeManagingApplicationsUsecase {
  execute(userId: string): Promise<boolean>;
}
