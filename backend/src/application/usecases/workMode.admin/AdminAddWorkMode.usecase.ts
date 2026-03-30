import { inject, injectable } from 'tsyringe';
import IAdminAddWorkModeUsecase from '../../interfaces/usecases/workMode.admin/IAdminAddWorkMode.usecase';
import IWorkModeRepository from '../../../domain/interfaces/admin/IWorkMode.repo';
import WorkModeMapper from '../../mappers/workMode.admin/WorkMode.mapperClass';
import WorkModeDTO, { CreateWorkModeDTO } from '../../DTOs/workMode.admin/workMode.dto';
import { ResourceAlreadyExistError } from '../../../domain/errors/AppError';

@injectable()
export default class AdminAddWorkModeUsecase implements IAdminAddWorkModeUsecase {
  constructor(
    @inject('IWorkModeRepository') private _repo: IWorkModeRepository,
    @inject('WorkModeMapper') private _mapper: WorkModeMapper
  ) {}

  async execute(dto: CreateWorkModeDTO): Promise<WorkModeDTO | null> {
    const { name, isActive } = dto;
    const existing = await this._repo.findWorkModeWithSlugName(name.toLowerCase());
    if (existing) {
      throw new ResourceAlreadyExistError('Work Mode');
    }

    const newWorkMode = await this._repo.create({ name, slug: name.toLowerCase(), isActive });
    if (newWorkMode) {
      return this._mapper.entityToDTO(newWorkMode);
    }
    return null;
  }
}
