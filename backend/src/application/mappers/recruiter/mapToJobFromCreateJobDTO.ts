import Job from "../../../domain/entities/job";
import CreateJobDTO from "../../DTOs/recruiter/createJobDTO";

export default function mapToJobFromCreateJobDTO(createJobDto : CreateJobDTO) : Job {
    return {
        description:createJobDto.description,
        experience:createJobDto.experience,
        expiresAt:createJobDto.expiresAt,
        jobLevel:createJobDto.jobLevel,
        jobTitle:createJobDto.jobTitle,
        location:createJobDto.location,
        jobType:createJobDto.jobType,
        locationType:createJobDto.locationType,
        maxSalary:createJobDto.maxSalary,
        minSalary:createJobDto.minSalary,
        qualification:createJobDto.qualification,
        requirements:createJobDto.requirements,
        responsibilities:createJobDto.responsibilities,
        vacancies:createJobDto.vacancies,
        companyId:createJobDto.companyId,
        duration:createJobDto.duration,
        requiredSkills:createJobDto.requiredSkills,
        optionalSkills:createJobDto.optionalSkills
    }
}