import { inject, injectable } from 'tsyringe';
import Job from '../../../domain/entities/recruiter/job.entity';
import IJobRepo from '../../../domain/interfaces/IJobRepo';
import ILoadRecruiterJobsUsecase from '../../interfaces/usecases/recruiter/ILoadRecruiterJobs.usecase';
import { JobDTO } from '../../DTOs/recruiter/createJob.dto';
import { JobsQueryDTO } from '../../DTOs/shared/jobsQuery.dto';
import { JobsQuery } from '../../queries/jobs.query';
import PaginatedJobsDTO from '../../DTOs/recruiter/paginattedJobsDTO.dto';
import LoadRecruiterJobsDTO from '../../DTOs/recruiter/loadRecruiterJobs.dto';

@injectable()
export class LoadRecruiterJobsUsecase implements ILoadRecruiterJobsUsecase {
  constructor(@inject('IJobRepository') private _jobRepo: IJobRepo) {}

  async execute(loadRecruiterJobsDto: LoadRecruiterJobsDTO): Promise<PaginatedJobsDTO | null> {
    const {recruiterId, search, limit, page, sortOption, filter} = loadRecruiterJobsDto
    //manage query before making request
    console.log('checking sort option from the usecase', sortOption)
    const sort: {[key: string]: number} = {}
    switch(sortOption){
      case 'Newest' :
        sort['createdAt'] = -1
        break;
      case 'Oldest' :
        sort['createdAt'] = 1
        break;
      case 'Expiry' :
        sort['expiryDate'] = -1
        break;
      case 'Application-most' :
        sort['applicationsCount'] = -1
        break;
      case 'Application-least' :
        sort['applicationsCount'] = 1
        break;
      default :
        sort['createdAt'] = -1
        break;
    }

    const filterData: {status: string[], workMode: string[]} = {
      status:['draft', 'active', 'expired', 'closed', 'rejected', 'blocked'],
      workMode:['On-site', 'Remote', 'Hybrid']
    }

    if(filter.status && filter.status !== 'all'){
      switch(filter.status){
        case 'active' :
          filterData['status'] = ['active']
          break;
        case 'draft' :
          filterData['status'] = ['draft']
          break;
        case 'expired' :
          filterData['status'] = ['expired']
          break;
        case 'closed' :
          filterData['status'] = ['closed']
          break;
        case 'rejected' :
          filterData['status'] = ['rejected']
          break;
        case 'blocked' :
          filterData['status'] = ['blocked']
          break;
        default :
          filterData['status'] = ['draft', 'active', 'expired', 'closed', 'rejected', 'blocked']
          break;
      }
    }

    if(filter.workMode && filter.workMode !== 'all'){
      switch(filter.workMode){
        case 'On-site' :
          filterData['workMode'] = ['On-site']
          break;
        case 'Remote' :
          filterData['workMode'] = ['Remote']
          break;
        case 'Hybrid' :
          filterData['workMode'] = ['Hybrid']
          break;
        default :
          filterData['workMode'] = ['On-site', 'Remote', 'Hybrid']
          break;
      }
    }

    //'draft' | 'active' | 'expired' | 'closed' | 'rejected' | 'blocked'

    const dbQuery : JobsQuery = {
      search: search,
      page: page,
      limit: limit,
      skip: (page - 1) * limit,
      sortOption: sort,
      filter:filterData
    }
    const result = await this._jobRepo.getRecruiterJobsByRecruiterId(recruiterId, dbQuery)
    // onst {jobs, totalPages, totalDocs} : {jobs: Job[], totalPages: number, totalDocs: number, page: number} = result
    
    if(result){
      const {jobs, totalPages, page, totalDocs} = result
      const jobsDto : JobDTO[] = []

      jobs.forEach((job: Job) => {
        jobsDto.push(job)
      })


      return {jobs: jobsDto, page: page, limit: limit, totalPages: totalPages}
    }
    return null;
  }
}
