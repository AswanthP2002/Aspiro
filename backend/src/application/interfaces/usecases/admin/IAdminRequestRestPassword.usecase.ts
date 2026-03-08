export default interface IAdminRequestResetUserPasswordUsecase {
  execute(id: string, email: string): Promise<{ token: string } | null>;
}
