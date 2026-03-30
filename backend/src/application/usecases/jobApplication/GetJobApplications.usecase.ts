import IJobApplicationRepo from '../../../domain/interfaces/IJobApplicationRepo';
import IGetJobApplicationsUseCase from '../../interfaces/usecases/jobApplication/IGetJobApplications.usecase';
import { inject, injectable } from 'tsyringe';
import JobApplicationsListForRecruiterDTO, {
  JobApplicationListRecruiterRequestDTO,
} from '../../DTOs/jobApplication/JobApplicationsListForRecruiter.dto';
import JobApplicationMapper from '../../mappers/jobApplication/JobApplication.mapperClass';

@injectable()
export default class GetJobApplicationsUseCase implements IGetJobApplicationsUseCase {
  constructor(
    @inject('IJobApplicationRepository') private _iJobApplicationRepo: IJobApplicationRepo,
    @inject('JobApplicationMapper') private _mapper: JobApplicationMapper
  ) {}

  async execute(dto: JobApplicationListRecruiterRequestDTO): Promise<{
    applications: JobApplicationsListForRecruiterDTO[];
    totalPages: number;
    totalDocs: number;
    applied?: number;
    screening?: number;
    interview?: number;
    offer?: number;
    hired?: number;
    rejected?: number;
  } | null> {
    const { search, page, limit, filter, jobId } = dto;
    let statusFilter = ['applied', 'screening', 'interview', 'offer', 'hired', 'rejected'];
    switch (filter) {
      case 'applied':
        statusFilter = ['applied'];
        break;
      case 'screening':
        statusFilter = ['screening'];
        break;
      case 'interview':
        statusFilter = ['interview'];
        break;
      case 'offer':
        statusFilter = ['offer'];
        break;
      case 'hired':
        statusFilter = ['hired'];
        break;
      case 'rejected':
        statusFilter = ['rejected'];
        break;
      default:
        statusFilter = ['applied', 'screening', 'interview', 'offer', 'hired', 'rejected'];
    }
    const result = await this._iJobApplicationRepo.getApplicationsByJobId(
      jobId,
      search,
      page,
      limit,
      statusFilter
    );
    if (result) {
      const dto: JobApplicationsListForRecruiterDTO[] = [];
      result.applications.forEach((data) =>
        dto.push(this._mapper.jobApplicationAggregatedToJobApplicationListForRecruiterDTO(data))
      );

      return {
        applications: dto,
        totalDocs: result.totalDocs,
        totalPages: result.totalPages,
        applied: result.applied,
        screening: result.screening,
        interview: result.interview,
        offer: result.offer,
        hired: result.hired,
        rejected: result.rejected,
      };
    }
    return null;
  }
}
