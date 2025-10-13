export default interface IBlockCandidateUseCase {
  execute(id: string): Promise<boolean>;
}
