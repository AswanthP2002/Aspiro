import JobAggregatedDTO from '../../application/DTOs/jobDetails.dto';
import JobAggregated from '../entities/jobAggregated.entity';

export default function mapJobAggregatedToJobDetailsDTO(
  jobAggregated: JobAggregated
): JobAggregatedDTO {
  return {
    _id: jobAggregated._id,
    companyDetails: jobAggregated.companyDetails,
    description: jobAggregated.description,
    duration: jobAggregated.duration,
    experience: jobAggregated.experience,
    expiresAt: jobAggregated.experience,
    jobLevel: jobAggregated.jobLevel,
    jobTitle: jobAggregated.jobTitle,
    jobType: jobAggregated.jobType,
    location: jobAggregated.location,
    locationType: jobAggregated.locationType,
    maxSalary: jobAggregated.maxSalary,
    minSalary: jobAggregated.minSalary,
    optionalSkills: jobAggregated.optionalSkills,
    qualification: jobAggregated.qualification,
    requiredSkills: jobAggregated.requiredSkills,
    requirements: jobAggregated.requirements,
    responsibilities: jobAggregated.responsibilities,
    vacancies: jobAggregated.vacancies,
    companyId: jobAggregated.companyId,
    createdAt: jobAggregated.createdAt,
    isBlocked: jobAggregated.isBlocked,
    isRejected: jobAggregated.isRejected,
    updatedAt: jobAggregated.updatedAt,
  };
}
