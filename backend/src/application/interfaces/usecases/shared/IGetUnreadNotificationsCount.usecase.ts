export default interface IGetUnReadNotificationsCountUsecase {
  execute(userId: string): Promise<number | null>;
}
