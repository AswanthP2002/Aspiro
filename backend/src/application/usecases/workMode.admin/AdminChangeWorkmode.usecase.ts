import { inject, injectable } from 'tsyringe';
import { IAdminChangeWorkModeStatusUsecase } from '../../interfaces/usecases/workMode.admin/IAdminChangeWorkmodeStatus.usecase';
import IWorkModeRepository from '../../../domain/interfaces/admin/IWorkMode.repo';
import WorkModeMapper from '../../mappers/workMode.admin/WorkMode.mapperClass';
import WorkModeDTO, { ChangeWorkModeStatusDTO } from '../../DTOs/workMode.admin/workMode.dto';

@injectable()
export default class AdminChangeWorkmodeUsecase implements IAdminChangeWorkModeStatusUsecase {
  constructor(
    @inject('IWorkModeRepository') private _repo: IWorkModeRepository,
    @inject('WorkModeMapper') private _mapper: WorkModeMapper
  ) {}

  async execute(dto: ChangeWorkModeStatusDTO): Promise<WorkModeDTO | null> {
    const { id, status } = dto;

    if (status === 'active') {
      const result = await this._repo.update(id, { isActive: true });
      return result as WorkModeDTO;
    } else if (status === 'inactive') {
      const result = await this._repo.update(id, { isActive: false });
      return result as WorkModeDTO;
    }

    return null;
  }
}
