import Resume from '../../../domain/entities/user/resume.entity';
import ResumeDTO from '../../DTOs/user/resume.dto';

export default function mapToResumeDTOFromResume(resume: Resume): ResumeDTO {
  return {
    _id: resume._id,
    resumeFileName: resume.resumeFileName,
    resumePublicIdCloudinary: resume.resumePublicIdCloudinary,
    resumeUrlCoudinary: resume.resumeUrlCoudinary,
    createdAt: resume.createdAt,
  };
}
