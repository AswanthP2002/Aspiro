export default interface IAdminDeleteUserUsecase {
    execute(userId: string): Promise<void>
}