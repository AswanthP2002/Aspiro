import { ResumeDTO } from "../../../presentation/controllers/dtos/candidate/resumeDTO";
import Resume from "../../entities/candidate/resume";

export default function createResumefromDTO(dto: ResumeDTO): Resume {
    return {
        ...dto,
        createdAt: new Date()
    }
}