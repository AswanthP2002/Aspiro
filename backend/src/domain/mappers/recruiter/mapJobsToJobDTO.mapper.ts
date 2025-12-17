import { JobDTO } from "../../../application/DTOs/recruiter/createJob.dto";
import Job from "../../entities/recruiter/job.entity";

export default function mapJobsToJobDTO(job: Job): JobDTO {
    return {
        _id: job._id,
        recruiterId: job.recruiterId,
        description: job.description,
        duration: job.duration,
        experienceInYears: job.experienceInYears,
        jobTitle:job.jobTitle,
        jobType: job.jobType,
        location: job.location,
        workMode: job.workMode,
        maxSalary: job.maxSalary,
        minSalary: job.minSalary,
        optionalSkills: job.optionalSkills,
        qualification: job.qualification,
        requiredSkills: job.requiredSkills,
        requirements: job.requirements,
        responsibilities: job.responsibilities,
        vacancies: job.vacancies,
        salaryCurrency: job.salaryCurrency,
        applicationsCount:job.applicationsCount,
        jobLevel:job.jobLevel,
        rejectionReason:job.rejectionReason,
        salaryPeriod:job.salaryPeriod,
        status:job.status,
        views:job.views,
        expiresAt:job.expiresAt,
        createdAt:job.createdAt,
        updatedAt: job.updatedAt,
    }
}