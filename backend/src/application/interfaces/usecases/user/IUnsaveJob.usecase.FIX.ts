export default interface IUnsaveJobUseCase {
  execute(id: string): Promise<void>;
}
