import { inject, injectable } from 'tsyringe';
import IAdminAddWorkModeUsecase from '../../interfaces/usecases/admin/IAdminAddWorkMode.usecase';
import IWorkModeRepository from '../../../domain/interfaces/admin/IWorkMode.repo';
import WorkModeMapper from '../../mappers/admin/WorkMode.mapperClass';
import WorkModeDTO, { CreateWorkModeDTO } from '../../DTOs/admin/workMode.dto';

@injectable()
export default class AdminAddWorkModeUsecase implements IAdminAddWorkModeUsecase {
  constructor(
    @inject('IWorkModeRepository') private _repo: IWorkModeRepository,
    @inject('WorkModeMapper') private _mapper: WorkModeMapper
  ) {}

  async execute(dto: CreateWorkModeDTO): Promise<WorkModeDTO | null> {
    const { name, isActive } = dto;
    const newWorkMode = await this._repo.create({ name, slug: name.toLowerCase(), isActive });
    if (newWorkMode) {
      return this._mapper.entityToDTO(newWorkMode);
    }
    return null;
  }
}
