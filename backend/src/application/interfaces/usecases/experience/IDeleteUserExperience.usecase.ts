export default interface IDeleteUserExperienceUsecase {
  execute(experienceId: string): Promise<void>;
}
