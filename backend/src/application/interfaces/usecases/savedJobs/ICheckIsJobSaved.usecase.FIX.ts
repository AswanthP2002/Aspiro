export default interface ICheckIsJobSavedUseCase {
  execute(jobId: string, candidateId: string): Promise<boolean | null>;
}
