import Education from "../../../domain/entities/candidate/educations";
import { EducationDTO } from "../../DTOs/candidate/educationDTO";

export default function mapToEducationDTOFromEducation(education : Education) : EducationDTO {
    return {
        _id:education._id,
        stream:education.stream,
        level:education.level,
        organization:education.organization,
        location:education.location,
        isPresent:education.isPresent,
        startYear:education.startYear,
        endYear:education.endYear,
        candidateId:education.candidateId,
        createdAt:education.createdAt,
        updatedAt:education.updatedAt
    }
}