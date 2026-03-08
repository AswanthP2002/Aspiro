import { SingleJobApplicationDetailsAggregated } from '../../../domain/entities/recruiter/jobApplicationDetailsAggregated.entity';
import ApplicationsAggregated from '../../../domain/entities/recruiter/jobApplicationsAggregated.entity';
import JobApplication, {
  JobApplicationStatus,
} from '../../../domain/entities/user/jobApplication.entity';
import JobApplicationAggregated from '../../../domain/entities/user/jobApplicationAggregated.entity';
import CreateJobApplicationDTO, { JobApplicationDTO } from '../../DTOs/job/jobApplication.dto.FIX';
import JobApplicationsListForRecruiterDTO, {
  SingleApplicationDetailsForRecruiterDTO,
} from '../../DTOs/job/JobApplicationsListForRecruiter.dto';
import { MyApplicationsListDTO } from '../../DTOs/job/myApplications.dto';

export default class JobApplicationMapper {
  public jobApplicationEntityToDTO(data: JobApplication): JobApplicationDTO {
    return {
      _id: data._id,
      candidateId: data.candidateId,
      coverLetterContent: data.coverLetterContent,
      jobId: data.jobId,
      notes: data.notes,
      resumeId: data.resumeId,
      status: data.status,
    };
  }

  public createJobApplicationDtoToJobApplicationEntity(
    data: CreateJobApplicationDTO
  ): JobApplication {
    return {
      coverLetterContent: data.coverLetterContent,
      candidateId: data.candidateId,
      jobId: data.jobId,
      resumeId: data.resumeId,
    };
  }

  public jobApplicationAggregatedToJobApplicationListForRecruiterDTO(
    data: ApplicationsAggregated
  ): JobApplicationsListForRecruiterDTO {
    return {
      _id: data._id,
      status: data.status,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      candidateDetails: {
        name: data.applicant.name,
        _id: data.applicant._id,
        email: data.applicant.email,
        headline: data.applicant.headline,
        location: `${data.applicant.location?.city},${data.applicant.location?.district},${data.applicant.location?.state}`,
        match: 0,
      },
    };
  }

  public SingleJobApplicationDetailsAggregatedToDTO(
    data: SingleJobApplicationDetailsAggregated
  ): SingleApplicationDetailsForRecruiterDTO {
    return {
      _id: data._id,
      status: data.status,
      notes: data.notes,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      candidateDetails: {
        _id: data.candidateDetails?._id,
        name: data.candidateDetails?.name,
        email: data.candidateDetails?.email,
        phone: data.candidateDetails?.phone,
        headline: data.candidateDetails?.headline,
        location: `${data.candidateDetails?.location?.city}, ${data.candidateDetails?.location?.district}, ${data.candidateDetails?.location?.state}`,
        match: 0,
      },
      educations: data.educations,
      experiences: data.experiences,
      resumeDetails: {
        _id: data.resume?._id,
        url: data.resume?.resumeUrlCoudinary,
      },
      skills: data.skills,
    };
  }

  public jobApplicationAggregatedToMyApplicationListDTO(
    data: JobApplicationAggregated
  ): MyApplicationsListDTO {
    return {
      _id: data._id,
      status: data.status as JobApplicationStatus,
      createdAt: data.createdAt.toString(),
      updatedAt: data.updatedAt.toString(),
      jobDetails: {
        _id: data.jobDetails._id,
        jobTitle: data.jobDetails.jobTitle,
        jobType: data.jobDetails.jobType,
        jobLevel: data.jobDetails.jobLevel,
        workMode: data.jobDetails.workMode,
        minSalary: data.jobDetails.minSalary,
      },
      recruiterDetails: {
        _id: data.recruiterProfile._id,
        name: data.recruiterProfile.fullName,
      },
      companyDetails: {
        _id: data.companyProfile?._id,
        name: data.companyProfile?.name,
      },
    };
  }
}
