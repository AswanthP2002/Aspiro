import { inject, injectable } from 'tsyringe';
import ISetResumePrimaryUsecase from '../../interfaces/usecases/user/ISetResumePrimary.usecase';
import ResumeMapper from '../../mappers/user/Resume.mapperClass';
import IResumeRepo from '../../../domain/interfaces/user/IResumeRepo';
import ResumeDTO, { SetResumePrimaryDTO } from '../../DTOs/user/resume.dto';

@injectable()
export default class SetResumePrimaryUsecase implements ISetResumePrimaryUsecase {
  constructor(
    @inject('IResumeRepository') private _repo: IResumeRepo,
    @inject('ResumeMapper') private _mapper: ResumeMapper
  ) {
    this._mapper = new ResumeMapper();
  }

  async execute(dto: SetResumePrimaryDTO): Promise<ResumeDTO | null> {
    const { resumeId, userId } = dto;
    const result = await this._repo.setResumePrimary(userId, resumeId);

    if (result) {
      const dto = this._mapper.resumeToResumeDTO(result);
      return dto;
    }

    return null;
  }
}
