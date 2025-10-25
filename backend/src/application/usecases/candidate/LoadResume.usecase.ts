import Resume from '../../../domain/entities/user/resume.entity';
import IResumeRepo from '../../../domain/interfaces/candidate/IResumeRepo';
import ResumeDTO from '../../DTOs/candidate/resume.dto';
import mapToResumeDTOFromResume from '../../mappers/user/mapToResumeDTOFromResume.mapper';
import ILoadResumeUseCase from './interface/ILoadResumes.usecase';

export default class LoadResumesUseCase implements ILoadResumeUseCase {
  constructor(private _iResumeRepo: IResumeRepo) {}

  async execute(candidateId?: string): Promise<ResumeDTO[] | null> {
    const result = await this._iResumeRepo.findWithCandidateId(
      candidateId?.toString()
    );
    if (result) {
      const dto: ResumeDTO[] = [];
      result.forEach((resume: Resume) => {
        dto.push(mapToResumeDTOFromResume(resume));
      });

      return dto;
    }
    return null;
  }
}
