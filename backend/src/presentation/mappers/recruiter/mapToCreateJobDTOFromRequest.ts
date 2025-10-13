import CreateJobDTO from '../../../application/DTOs/recruiter/createJob.dto';
import CreateJobRequestDTO from '../../DTOs/recruiter/createJobRequestDTO';

export default function mapToCreateJobDTOFromRequest(
  requestDTO: CreateJobRequestDTO
): CreateJobDTO {
  return {
    companyId: requestDTO.companyId,
    description: requestDTO.description,
    experience: requestDTO.experience,
    expiresAt: requestDTO.expiresAt,
    jobLevel: requestDTO.jobLevel,
    jobTitle: requestDTO.jobTitle,
    jobType: requestDTO.jobType,
    location: requestDTO.location,
    locationType: requestDTO.locationType,
    maxSalary: requestDTO.maxSalary,
    minSalary: requestDTO.minSalary,
    qualification: requestDTO.qualification,
    requirements: requestDTO.requirements,
    responsibilities: requestDTO.responsibilities,
    vacancies: requestDTO.vacancies,
    duration: requestDTO.duration,
    requiredSkills: requestDTO.requiredSkills,
    optionalSkills: requestDTO.optionalSkills,
  };
}
