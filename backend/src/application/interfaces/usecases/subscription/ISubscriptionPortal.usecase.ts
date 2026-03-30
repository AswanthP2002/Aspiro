export default interface ISubscriptionPortalUsecase {
  execute(userId: string): Promise<{ url: string } | null>;
}
