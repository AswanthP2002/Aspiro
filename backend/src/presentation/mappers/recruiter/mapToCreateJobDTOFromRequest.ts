import CreateJobDTO from '../../../application/DTOs/recruiter/createJob.dto';
import CreateJobRequestDTO from '../../DTOs/recruiter/createJobRequestDTO';

export default function mapToCreateJobDTOFromRequest(
  requestDTO: CreateJobRequestDTO
): CreateJobDTO {
  return {
    recruiterId: requestDTO.recruiterId,
    jobTitle: requestDTO.jobTitle,
    description: requestDTO.description,
    requirements: requestDTO.requirements,
    responsibilities: requestDTO.responsibilities,
    duration: requestDTO.duration,
    jobType: requestDTO.jobType,
    workMode: requestDTO.workMode,
    location: requestDTO.location,
    minSalary: requestDTO.minSalary,
    maxSalary: requestDTO.maxSalary,
    salaryCurrency: requestDTO.salaryCurrency,
    salaryPeriod: requestDTO.salaryPeriod,
    vacancies: requestDTO.vacancies,
    qualification: requestDTO.qualification,
    experienceInYears: requestDTO.experienceInYears,
    jobLevel: requestDTO.jobLevel,
    requiredSkills: requestDTO.requiredSkills,
    optionalSkills: requestDTO.optionalSkills,
    expiresAt:requestDTO.expiresAt
  };
}
