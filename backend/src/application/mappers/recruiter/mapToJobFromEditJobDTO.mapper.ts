import Job from "../../../domain/entities/recruiter/job.entity";
import { EditJobDTO } from "../../DTOs/recruiter/createJob.dto";

export default function mapToJobFromEditJobDTO(editJobDto: EditJobDTO): Job {
    return {
        _id: editJobDto._id,
        recruiterId: editJobDto.recruiterId,
        jobTitle: editJobDto.jobTitle,
        description: editJobDto.description,
        requirements: editJobDto.requirements,
        responsibilities: editJobDto.responsibilities,
        duration: editJobDto.duration,
        jobType: editJobDto.jobType,
        workMode: editJobDto.workMode,
        location: editJobDto.location,
        minSalary: editJobDto.minSalary,
        maxSalary: editJobDto.maxSalary,
        salaryCurrency: editJobDto.salaryCurrency,
        salaryPeriod: editJobDto.salaryPeriod,
        vacancies: editJobDto.vacancies,
        qualification: editJobDto.qualification,
        experienceInYears: editJobDto.experienceInYears,
        jobLevel: editJobDto.jobLevel,
        requiredSkills: editJobDto.requiredSkills,
        optionalSkills: editJobDto.optionalSkills,
        status: editJobDto.status,
        rejectionReason: editJobDto.rejectionReason,
        views: editJobDto.views,
        applicationsCount: editJobDto.applicationsCount,
        createdAt: editJobDto.createdAt,
        updatedAt: editJobDto.updatedAt,
        expiresAt: editJobDto.expiresAt
    }
}