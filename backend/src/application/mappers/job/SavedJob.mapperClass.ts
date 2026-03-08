import FavoriteJobsAggregated from '../../../domain/entities/user/favoriteJobsAggregated.entity';
import { MySavedJobsDTO } from '../../DTOs/job/loadSavedJobs.dto';

export default class SavedJobsMapper {
  public favoriteJobAggregatedToMySavedJobsDTO(data: FavoriteJobsAggregated): MySavedJobsDTO {
    return {
      _id: data._id,
      jobDetails: {
        _id: data.jobDetails._id,
        jobTitle: data.jobDetails.jobTitle,
        minSalary: data.jobDetails.minSalary,
        maxSalary: data.jobDetails.maxSalary,
        requiredSkills: data.jobDetails.requiredSkills,
        salaryCurrency: data.jobDetails.salaryCurrency,
        applicationsCount: data.jobDetails.applicationsCount,
        expiresAt: data.jobDetails.expiresAt,
        isFlagged: data.jobDetails.isFlagged,
        jobLevel: data.jobDetails.jobLevel,
        workMode: data.jobDetails.workMode,
        jobType: data.jobDetails.jobType,
        location: data.jobDetails.location,
        salaryPeriod: data.jobDetails.salaryPeriod,
        vacancies: data.jobDetails.vacancies,
      },
      recruiterDetails: {
        _id: data.recruiterProfile._id as string,
        name: data.recruiterProfile.fullName as string,
      },
      companyDetails: {
        _id: data.companyDetails._id as string,
        name: data.companyDetails.name,
      },
      createdAt: data.createdAt,
    };
  }
}
