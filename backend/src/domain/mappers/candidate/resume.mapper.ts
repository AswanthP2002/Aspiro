import { ResumeDTO } from '../../../presentation/controllers/dtos/candidate/resumeDTO';
import Resume from '../../entities/user/resume.entity';

export default function createResumefromDTO(dto: ResumeDTO): Resume {
  return {
    ...dto,
    createdAt: new Date(),
  };
}
