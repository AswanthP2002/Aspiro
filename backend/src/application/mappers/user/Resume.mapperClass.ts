import Resume from '../../../domain/entities/user/resume.entity';
import ResumeDTO from '../../DTOs/user/resume.dto';

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
