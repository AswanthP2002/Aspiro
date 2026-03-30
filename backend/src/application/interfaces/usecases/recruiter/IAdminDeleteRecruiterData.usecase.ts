export interface IAdminDeleteRecruiterDataUsecase {
  execute(recruiterId: string): Promise<void>;
}
