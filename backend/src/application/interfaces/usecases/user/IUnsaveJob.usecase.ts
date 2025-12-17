export default interface IUnsaveJobUseCase {
  execute(jobId: string, candidateId: string): Promise<void>;
}
