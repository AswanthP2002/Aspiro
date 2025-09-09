import JobApplication from "../../../domain/entities/candidate/jobApplication";
import CreateJobApplicationDTO from "../../DTOs/candidate/jobApplicationDTO";
import CreateJobDTO from "../../DTOs/recruiter/createJobDTO";

export default function mapToJobApplicationFromCreateJobDTO(createJobApplicationDto : CreateJobApplicationDTO) : JobApplication {
    return {
        coverLetterContent:createJobApplicationDto.coverLetterContent,
        candidateId:createJobApplicationDto.candidateId,
        jobId:createJobApplicationDto.jobId,
        resumeId:createJobApplicationDto.resumeId
    }
}