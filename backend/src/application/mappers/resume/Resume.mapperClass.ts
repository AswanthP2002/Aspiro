import Resume from '../../../domain/entities/resume/resume.entity';
import ResumeDTO from '../../DTOs/resume/resume.dto';

export default class ResumeMapper {
  public resumeToResumeDTO(resume: Resume): ResumeDTO {
    return {
      _id: resume._id,
      userId: resume.userId,
      name: resume.name,
      resumeUrlCoudinary: resume.resumeUrlCoudinary,
      resumePublicIdCloudinary: resume.resumePublicIdCloudinary,
      isPrimary: resume.isPrimary,
      createdAt: resume.createdAt,
    };
  }
}
