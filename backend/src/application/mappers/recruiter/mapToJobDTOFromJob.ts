import Job from "../../../domain/entities/job";
import { JobDTO } from "../../DTOs/recruiter/createJobDTO";

export default function mapToJobDTOFromJob(job : Job) : JobDTO {
    return {
        description:job.description,
        experience:job.experience,
        expiresAt:job.expiresAt,
        jobLevel:job.jobLevel,
        jobTitle:job.jobTitle,
        jobType:job.jobType,
        location:job.location,
        locationType:job.location,
        maxSalary:job.maxSalary,
        minSalary:job.minSalary,
        qualification:job.qualification,
        requirements:job.requirements,
        responsibilities:job.responsibilities,
        vacancies:job.vacancies,
        _id:job._id,
        companyId:job.companyId,
        createdAt:job.createdAt,
        isBlocked:job.isBlocked,
        isRejected:job.isRejected,
        updatedAt:job.updatedAt,
        duration:job.duration,
        requiredSkills:job.requiredSkills,
        optionalSkills:job.optionalSkills
    }
}