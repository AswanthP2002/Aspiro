import JobApplicationAggregated from '../../../domain/entities/user/jobApplicationAggregated.entity';
import IJobApplicationRepo from '../../../domain/interfaces/IJobApplicationRepo';
import { inject, injectable } from 'tsyringe';
import IGetMyApplicationsUsecase from '../../interfaces/usecases/user/IGetMyApplications.usecase.FIX';
import { LoadMyApplicationsDTO, MyApplicationsListDTO } from '../../DTOs/job/myApplications.dto';
import JobApplicationMapper from '../../mappers/job/JobApplication.mapperClass';

@injectable()
export default class GetMyApplicationsUsecase implements IGetMyApplicationsUsecase {
  constructor(
    @inject('IJobApplicationRepository') private _iJobApplicationRepo: IJobApplicationRepo,
    @inject('JobApplicationMapper') private _mapper: JobApplicationMapper
  ) {}

  async execute(dto: LoadMyApplicationsDTO): Promise<{
    applications: MyApplicationsListDTO[];
    totalPages: number;
    totalDocs: number;
  } | null> {
    const { search, page, candidateId, limit, sort, status } = dto;

    let sortOption: { [key: string]: 1 | -1 } = { createdAt: -1 };
    let statusFilter: string[] = [
      'applied',
      'screening',
      'interview',
      'offer',
      'hired',
      'rejected',
    ];

    switch (sort) {
      case 'recently-applied':
        sortOption = { createdAt: -1 };
        break;
      case 'oldest-applied':
        sortOption = { createdAt: 1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    switch (status) {
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

    const result = await this._iJobApplicationRepo.getCandidateSpecificApplications(
      candidateId,
      search,
      page,
      limit,
      statusFilter,
      sortOption
    );
    if (result) {
      const dto: MyApplicationsListDTO[] = [];
      result.applications.forEach((application: JobApplicationAggregated) => {
        dto.push(this._mapper.jobApplicationAggregatedToMyApplicationListDTO(application));
      });
      return { applications: dto, totalDocs: result.totalDocs, totalPages: result.totalPages };
    }
    return null;
  }
}

//stoped here in the mapping
