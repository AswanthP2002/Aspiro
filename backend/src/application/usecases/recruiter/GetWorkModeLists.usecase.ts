import { inject, injectable } from 'tsyringe';
import IGetWorkModeListsUsecase from '../../interfaces/usecases/recruiter/IGetWorkModeLists.usecase';
import IWorkModeRepository from '../../../domain/interfaces/admin/IWorkMode.repo';
import WorkModeMapper from '../../mappers/admin/WorkMode.mapperClass';
import WorkModeDTO from '../../DTOs/admin/workMode.dto';
import WorkMode from '../../../domain/entities/admin/workMode.entity';

@injectable()
export default class GetWorkModesListUsecase implements IGetWorkModeListsUsecase {
  constructor(
    @inject('IWorkModeRepository') private _repo: IWorkModeRepository,
    @inject('WorkModeMapper') private _mapper: WorkModeMapper
  ) {}

  async execute(): Promise<WorkModeDTO[] | null> {
    const result = await this._repo.find();
    if (result) {
      const dto: WorkModeDTO[] = [];
      result.forEach((workMode: WorkMode) => dto.push(this._mapper.entityToDTO(workMode)));
      return dto;
    }

    return null;
  }
}
