import Job from '../../../domain/entities/recruiter/job.entity';
import { JobDTO } from '../../DTOs/recruiter/createJob.dto';

export default function mapToJobDTOFromJob(job: Job): JobDTO {
  return {
    _id: job._id,
    recruiterId: job.recruiterId,
    jobTitle: job.jobTitle,
    description: job.description,
    requirements: job.requirements,
    responsibilities: job.responsibilities,
    duration: job.duration,
    jobType: job.jobType,
    workMode: job.workMode,
    location: job.location,
    minSalary: job.minSalary,
    maxSalary: job.maxSalary,
    salaryCurrency: job.salaryCurrency,
    salaryPeriod: job.salaryPeriod,
    vacancies: job.vacancies,
    qualification: job.qualification,
    experienceInYears: job.experienceInYears,
    jobLevel: job.jobLevel,
    requiredSkills: job.requiredSkills,
    optionalSkills: job.optionalSkills,
    status: job.status,
    rejectionReason: job.rejectionReason,
    views: job.views,
    applicationsCount: job.applicationsCount,
    createdAt: job.createdAt,
    updatedAt: job.updatedAt,
    expiresAt: job.expiresAt
  };
}
