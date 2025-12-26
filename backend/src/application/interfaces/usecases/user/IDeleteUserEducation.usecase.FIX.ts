export default interface IDeleteUserEducationUsecase {
  execute(educationId: string): Promise<void>;
}
