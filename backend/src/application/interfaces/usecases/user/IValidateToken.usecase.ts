export default interface IValidateTokenUsecase {
  execute(token: string): Promise<boolean | null>;
}
