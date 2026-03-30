import { inject, injectable } from 'tsyringe';
import IAdminEditWorkModeUsecase from '../../interfaces/usecases/workMode.admin/IAdminEditWorkMode.usecase';
import IWorkModeRepository from '../../../domain/interfaces/admin/IWorkMode.repo';
import WorkModeMapper from '../../mappers/workMode.admin/WorkMode.mapperClass';
import WorkModeDTO, { EditWorkModeDTO } from '../../DTOs/workMode.admin/workMode.dto';

@injectable()
export default class AdminEditWorkModeUsecase implements IAdminEditWorkModeUsecase {
  constructor(
    @inject('IWorkModeRepository') private _repo: IWorkModeRepository,
    @inject('WorkModeMapper') private _mapper: WorkModeMapper
  ) {}

  async execute(dto: EditWorkModeDTO): Promise<WorkModeDTO | null> {
    const { name, id } = dto;

    const result = await this._repo.update(id, { name, slug: name?.toLowerCase() });
    if (result) {
      return this._mapper.entityToDTO(result);
    }

    return null;
  }
}
