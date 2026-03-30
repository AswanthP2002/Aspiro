export default interface IGetSessionDetailsUsecase {
  execute(sessionId: string): Promise<{
    amount: number;
    currency: string;
    email: string;
    planName: string;
    status: string;
    startingPeriod: string;
    endPeriod: string;
  }>;
}
