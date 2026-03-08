import JobApplicationsListForRecruiterDTO, {
  JobApplicationListRecruiterRequestDTO,
} from '../../../DTOs/job/JobApplicationsListForRecruiter.dto';

export default interface IGetJobApplicationsUseCase {
  execute(dto: JobApplicationListRecruiterRequestDTO): Promise<{
    applications: JobApplicationsListForRecruiterDTO[];
    totalPages: number;
    totalDocs: number;
  } | null>;
}
