export default interface ISendResetPassworLinkUsecase {
    execute(email: string): Promise<void>
}