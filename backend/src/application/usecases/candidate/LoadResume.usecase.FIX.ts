import { inject, injectable } from 'tsyringe';
import Resume from '../../../domain/entities/user/resume.entity';
import IResumeRepo from '../../../domain/interfaces/user/IResumeRepo';
import ResumeDTO from '../../DTOs/user/resume.dto';
import ILoadResumeUseCase from '../../interfaces/usecases/user/ILoadResumes.usecase.FIX';
import ResumeMapper from '../../mappers/user/Resume.mapperClass';

@injectable()
export default class LoadResumesUseCase implements ILoadResumeUseCase {
  constructor(
    @inject('IResumeRepository') private _iResumeRepo: IResumeRepo,
    @inject('ResumeMapper') private _mapper: ResumeMapper
  ) {}

  async execute(candidateId?: string): Promise<ResumeDTO[] | null> {
    const result = await this._iResumeRepo.findWithCandidateId(candidateId?.toString());
    if (result) {
      const dto: ResumeDTO[] = [];
      result.forEach((resume: Resume) => {
        dto.push(this._mapper.resumeToResumeDTO(resume));
      });

      return dto;
    }
    return null;
  }
}
