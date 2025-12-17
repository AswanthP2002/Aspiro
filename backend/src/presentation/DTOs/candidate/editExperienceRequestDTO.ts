export default interface EditExperienceRequestDTO {
  experienceId: string;
  jobRole: string;
  jobType: string;
  organization: string;
  isPresent: boolean;
  startDate: string;
  endDate?: string;
  location: string;
  workMode: string;
}
