import Resume from "../../../domain/entities/candidate/resume";
import { ResumeDTO } from "../../DTOs/candidate/resumeDTO";


export default function mapToResumeDTOFromResume(resume : Resume) : ResumeDTO {
    return {
        _id:resume._id,
        resumeFileName:resume.resumeFileName,
        resumePublicIdCloudinary:resume.resumePublicIdCloudinary,
        resumeUrlCoudinary:resume.resumeUrlCoudinary
    }
}