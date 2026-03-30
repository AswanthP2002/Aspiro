export interface IGetUnreadAlertsCountUsecase {
  execute(userId: string): Promise<number | null>;
}
