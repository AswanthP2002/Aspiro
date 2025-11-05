import Job from '../../../domain/entities/recruiter/job.entity';
import CreateJobDTO from '../../DTOs/recruiter/createJob.dto';

export default function mapToJobFromCreateJobDTO(
  createJobDto: CreateJobDTO
): Job {
  return {
    recruiterId:createJobDto.recruiterId,
    jobTitle:createJobDto.jobTitle,
    description:createJobDto.description,
    requirements:createJobDto.requirements,
    responsibilities:createJobDto.responsibilities,
    duration:createJobDto.duration,
    jobType:createJobDto.jobType,
    workMode:createJobDto.workMode,
    location:createJobDto.location,
    minSalary:createJobDto.minSalary,
    maxSalary:createJobDto.maxSalary,
    salaryCurrency:createJobDto.salaryCurrency,
    salaryPeriod:createJobDto.salaryPeriod,
    vacancies:createJobDto.vacancies,
    qualification:createJobDto.qualification,
    experienceInYears:createJobDto.experienceInYears,
    jobLevel:createJobDto.jobLevel,
    requiredSkills:createJobDto.requiredSkills,
    optionalSkills:createJobDto.optionalSkills,
    status:createJobDto.status,
    rejectionReason:createJobDto.rejectionReason,
    views:createJobDto.views,
    applicationsCount:createJobDto.applicationsCount,
    expiresAt:createJobDto.expiresAt
  };
}
