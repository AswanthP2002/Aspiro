export default interface IHandleWebhookUsecase {
  execute(sig: string, rawBody: Buffer): Promise<{ received: boolean }>;
}
