import JobApplicationsListForRecruiterDTO, {
  JobApplicationListRecruiterRequestDTO,
} from '../../../DTOs/jobApplication/JobApplicationsListForRecruiter.dto';

export default interface IGetJobApplicationsUseCase {
  execute(dto: JobApplicationListRecruiterRequestDTO): Promise<{
    applications: JobApplicationsListForRecruiterDTO[];
    totalPages: number;
    totalDocs: number;
    applied?: number;
    screening?: number;
    interview?: number;
    offer?: number;
    hired?: number;
    rejected?: number;
  } | null>;
}
