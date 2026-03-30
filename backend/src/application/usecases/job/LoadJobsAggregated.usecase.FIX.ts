import { inject, injectable } from 'tsyringe';
import ILoadJobsAggregatedUsecase from '../../interfaces/usecases/job/IloadJobsAggregated.usecase.FIX';
import IJobRepo from '../../../domain/interfaces/IJobRepo';
import { JobListForPublicDTO, LoadJobListForPublicDTO } from '../../DTOs/job/loadJob.dto.FIX';
import JobMapper from '../../mappers/job/Job.mapperClass';
import IJobLevelRepository from '../../../domain/interfaces/admin/IJobLevel.repository';
import IWorkModeRepository from '../../../domain/interfaces/admin/IWorkMode.repo';
import IJobTypeRepository from '../../../domain/interfaces/admin/IJobType.repository';

@injectable()
export default class LoadJobsAggregatedUsecase implements ILoadJobsAggregatedUsecase {
  constructor(
    @inject('IJobRepository') private _jobRepo: IJobRepo,
    @inject('IJobLevelRepository') private _jobLevelRepo: IJobLevelRepository,
    @inject('IWorkModeRepository') private _workModeRepo: IWorkModeRepository,
    @inject('IJobTypeRepository') private _jobTypeRepo: IJobTypeRepository,
    @inject('JobMapper') private _mapper: JobMapper
  ) {}

  async execute(
    loadJobQueryDto: LoadJobListForPublicDTO
  ): Promise<{ jobs: JobListForPublicDTO[]; totalPages: number } | null> {
    const { search, page, limit, workModeFilter, jobLevelFilter, jobTypeFilter, locationSearch } =
      loadJobQueryDto;

    console.log('-- This is from  use case checking dto from controller', loadJobQueryDto);
    const [jobLevelResult, jobTypeResult, workModeResult] = await Promise.all([
      this._jobLevelRepo.find(),
      this._jobTypeRepo.find(),
      this._workModeRepo.find(),
    ]);
    console.log('--fetched workmode datas--', workModeResult);

    let jobLevel: string[] = jobLevelResult
      ? jobLevelResult.map((item) => item.name as string)
      : [];
    let jobType: string[] = jobTypeResult ? jobTypeResult.map((item) => item.name as string) : [];
    let workMode: string[] = workModeResult
      ? workModeResult.map((item) => item.name as string)
      : [];

    if (jobLevelResult) {
      jobLevelResult.forEach((item) => {
        if (jobLevelFilter === item.name) {
          jobLevel = [item.name as string];
        }
      });
    }

    if (jobTypeResult) {
      jobTypeResult.forEach((item) => {
        if (jobTypeFilter === item.name) {
          jobType = [item.name as string];
        }
      });
    }

    if (workModeResult) {
      workModeResult.forEach((item) => {
        if (workModeFilter === item.name) {
          workMode = [item.name as string];
        }
      });
    }

    const result = await this._jobRepo.getJobListForPublic({
      search,
      page,
      limit,
      locationSearch,
      jobLevelFilter: jobLevel,
      jobTypeFilter: jobType,
      workModeFilter: workMode,
    });

    if (result) {
      const { jobs, totalPages } = result;
      const dto: JobListForPublicDTO[] = [];
      jobs.forEach((job) => {
        dto.push(this._mapper.jobListAggregatedForPublicToJobListForPublicDTO(job));
      });

      return {
        jobs: dto,
        totalPages,
      };
    }

    return null;
  }
}
