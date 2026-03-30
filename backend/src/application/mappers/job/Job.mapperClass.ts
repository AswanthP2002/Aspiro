import AdminJobAggregatedEntity from '../../../domain/entities/job/adminJobAggregated.entity';
import JobListAggregatedForPublic from '../../../domain/entities/job/jobListAggregatedForPublic.entity';
import RecruiterJobDetailsDTO from '../../../domain/entities/job/recruiterJobDetails.dto';
import JobAggregated from '../../../domain/entities/job/jobAggregated.entity';
import Job from '../../../domain/entities/job/job.entity';
import JobAggregatedData from '../../../domain/entities/job/jobAggregatedData.entity';
import { AdminJobDetailsDTO } from '../../DTOs/job/jobDetails.dto.FIX';
import {
  AdminJobsListDTO,
  JobListForPublicDTO,
  LoadJobDetailsDTOForPublic,
  MyJobDTO,
} from '../../DTOs/job/loadJob.dto.FIX';
import { JobDTO } from '../../DTOs/job/createJob.dto';
import { JobAggregatedDTO } from '../../DTOs/job/jobAggregated.dto';
import RecommendedJobDTO from '../../DTOs/job/recommendedJob.dto';

export default class JobMapper {
  public jobAggregatedDataToJobAggregatedDTO(data: JobAggregatedData): JobAggregatedDTO {
    return {
      _id: data._id,
      jobTitle: data.jobTitle,
      jobLevel: data.jobLevel,
      minSalary: data.minSalary,
      maxSalary: data.maxSalary,
      description: data.description,
      requiredSkills: data.requiredSkills,
      optionalSkills: data.optionalSkills,
      applicationsCount: data.applicationsCount,
      duration: data.duration,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      experienceInYears: data.experienceInYears,
      expiresAt: data.expiresAt,
      jobType: data.jobType,
      location: data.location,
      qualification: data.qualification,
      recruiterId: data.recruiterId,
      rejectionReason: data.rejectionReason,
      requirements: data.requirements,
      responsibilities: data.responsibilities,
      salaryCurrency: data.salaryCurrency,
      salaryPeriod: data.salaryPeriod,
      status: data.status,
      userProfile: data.userProfile,
      userRecruiterProfile: data.userRecruiterProfile,
      vacancies: data.vacancies,
      views: data.views,
      workMode: data.workMode,
    };
  }

  public JobToMyJobDTO(data: Job): MyJobDTO {
    return {
      _id: data._id, //
      jobTitle: data.jobTitle, //
      applicationsCount: data.applicationsCount, //
      // createdAt: data.createdAt,
      // updatedAt: data.updatedAt,
      expiresAt: data.expiresAt, //
      // isArchived: data.isArchived,
      // isDeleted: data.isDeleted,
      // jobLevel: data.jobLevel,
      // jobType: data.jobType,
      location: data.location, //
      workMode: data.workMode, //
      status: data.status, //
      // views: data.views,
    };
  }

  public jobEntityToJobDTO(data: Job): JobDTO {
    return {
      _id: data._id,
      recruiterId: data.recruiterId,
      jobTitle: data.jobTitle,
      description: data.description,
      requirements: data.requirements,
      responsibilities: data.responsibilities,
      duration: data.duration,
      jobType: data.jobType as string,
      workMode: data.workMode as string,
      location: data.location as string,
      minSalary: data.minSalary,
      maxSalary: data.maxSalary,
      salaryCurrency: data.salaryCurrency,
      salaryPeriod: data.salaryPeriod,
      vacancies: data.vacancies,
      qualification: data.qualification,
      experienceInYears: data.experienceInYears,
      jobLevel: data.jobLevel,
      requiredSkills: data.requiredSkills,
      optionalSkills: data.optionalSkills,
      status: data.status,
      rejectionReason: data.rejectionReason,
      views: data.views,
      applicationsCount: data.applicationsCount,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      expiresAt: data.expiresAt,
    };
  }

  public jobAggregatedToAdminJobListDTO(data: AdminJobAggregatedEntity): AdminJobsListDTO {
    return {
      _id: data._id,
      jobTitle: data.jobTitle,
      jobLevel: data.jobLevel,
      createdAt: data.createdAt,
      expiresAt: data.expiresAt,
      isArchived: data.isArchived,
      isDeleted: data.isDeleted,
      isFlagged: data.isFlagged,
      jobType: data.jobType,
      reportsCount: data.reportsCount,
      status: data.status,
      updatedAt: data.updatedAt,
      workMode: data.workMode,
      companyName: data.companyDetails?.name,
      recruiterName: data.recruiterDetails?.fullName,
    };
  }

  public jobAggragatedToAdminJobDetailsDTO(data: AdminJobAggregatedEntity): AdminJobDetailsDTO {
    return {
      _id: data._id,
      jobTitle: data.jobTitle,
      jobLevel: data.jobLevel,
      jobType: data.jobType,
      description: data.description,
      maxSalary: data.maxSalary,
      minSalary: data.minSalary,
      optionalSkills: data.optionalSkills,
      qualification: data.qualification,
      requiredSkills: data.requiredSkills,
      requirements: data.requirements,
      responsibilities: data.responsibilities,
      applicationsCount: data.applicationsCount,
      companyName: data.companyDetails?.name,
      recruiterName: data.recruiterDetails?.fullName,
      createdAt: data.createdAt,
      expiresAt: data.expiresAt,
      isArchived: data.isArchived,
      isDeleted: data.isDeleted,
      isFlagged: data.isFlagged,
      location: data.location,
      reportsCount: data.reportsCount,
      status: data.status,
      updatedAt: data.updatedAt,
      views: data.views,
      workMode: data.workMode,
    };
  }

  public jobListAggregatedForPublicToJobListForPublicDTO(
    data: JobListAggregatedForPublic
  ): JobListForPublicDTO {
    return {
      _id: data._id,
      jobTitle: data.jobTitle,
      maxSalary: data.maxSalary,
      minSalary: data.minSalary,
      requiredSkills: data.requiredSkills,
      salaryCurrency: data.salaryCurrency,
      salaryPeriod: data.salaryPeriod,
      duration: data.duration,
      experience: data.experienceInYears.toString(),
      jobLevel: data.jobLevel,
      jobType: data.jobType,
      workMode: data.workMode,
      location: data.location,
      companyId: data.companyId,
      recruiterId: data.recruiterId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      expiresAt: data.expiresAt,
      companyDetails: {
        _id: data.companyProfileDetails?._id,
        name: data.companyProfileDetails?.name,
      },
      recruiterDetail: {
        _id: data.recruiterProfileDetails?._id,
        recruiterType: data.recruiterProfileDetails?.recruiterType,
        name: data.recruiterProfileDetails?.fullName,
        isVerified: data.recruiterProfileDetails?.isVerified,
      },
    };
  }

  public jobAggregatedToJobDetailsForPublicDTO(data: JobAggregated): LoadJobDetailsDTOForPublic {
    return {
      _id: data._id,
      jobTitle: data.jobTitle,
      recruiterProfileDetails: {
        _id: data.userRecruiterProfile?._id as string,
        recruiterType: data.userRecruiterProfile?.recruiterType as string,
        name: data.userRecruiterProfile?.fullName as string,
        professionalTitle: data.userRecruiterProfile?.professionalTitle as string,
        isVerifiedRecruiter: data.userRecruiterProfile?.isVerified ? true : false,
      },
      companyProfileDetails: {
        _id: data.companyProfileDetails?._id as string,
        name: data.companyProfileDetails?.name as string,
      },
      description: data.description,
      requiredSkills: data.requiredSkills,
      optionalSkills: data.optionalSkills,
      responsibilities: data.responsibilities,
      createdAt: data.createdAt,
      expiresAt: data.expiresAt,
      minSalary: data.minSalary,
      maxSalary: data.maxSalary,
      qualification: data.qualification,
      requirements: data.requirements,
      salaryCurrency: data.salaryCurrency,
      applicationsCount: data.applicationsCount,
      vacancies: data.vacancies,
      duration: data.duration,
      jobLevel: data.jobLevel,
      jobType: data.jobType,
      isFlagged: data.isFlagged,
      workMode: data.workMode,
      location: data.location,
      salaryPeriod: data.salaryPeriod,
      experienceInYears: data.experienceInYears,
    };
  }

  public jobAggregatedToRecruiterJobDetailsDTO(data: JobAggregated): RecruiterJobDetailsDTO {
    return {
      _id: data._id,
      description: data.description,
      experienceInYears: data.experienceInYears,
      jobTitle: data.jobTitle,
      location: data.location,
      maxSalary: data.maxSalary,
      minSalary: data.minSalary,
      optionalSkills: data.optionalSkills,
      qualification: data.qualification,
      requiredSkills: data.requiredSkills,
      requirements: data.requirements,
      responsibilities: data.responsibilities,
      salaryCurrency: data.salaryCurrency,
      applicationsCount: data.applicationsCount,
      createdAt: data.createdAt,
      duration: data.duration,
      expiresAt: data.expiresAt,
      jobLevel: data.jobLevel,
      jobType: data.jobType,
      salaryPeriod: data.salaryPeriod,
      status: data.status,
      updatedAt: data.updatedAt,
      views: data.views,
      workMode: data.workMode,
      vacancies: data.vacancies,
    };
  }

  public JobDetailsToRecommendedJobDTO(data: JobAggregated): RecommendedJobDTO {
    return {
      _id: data._id,
      jobTitle: data.jobTitle,
      recruiterDetails: {
        _id: data.userRecruiterProfile?._id as string,
        name: data.userRecruiterProfile?.fullName as string,
      },
      companyDetails: {
        _id: data.companyProfileDetails?._id as string,
        name: data.companyProfileDetails?.name as string,
      },
    };
  }
}
