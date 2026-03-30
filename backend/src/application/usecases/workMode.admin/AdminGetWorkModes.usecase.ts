import { inject, injectable } from 'tsyringe';
import { IAdminGetWorkModesUsecase } from '../../interfaces/usecases/workMode.admin/IAdminGetWorkModes.usecase';
import IWorkModeRepository from '../../../domain/interfaces/admin/IWorkMode.repo';
import WorkModeMapper from '../../mappers/workMode.admin/WorkMode.mapperClass';
import WorkModeDTO, {
  GetWorkModsDTO,
  PaginatedWorkModesDTO,
} from '../../DTOs/workMode.admin/workMode.dto';
import WorkMode from '../../../domain/entities/workMode/workMode.entity';

@injectable()
export default class AdminGetWorkModesUsecase implements IAdminGetWorkModesUsecase {
  constructor(
    @inject('IWorkModeRepository') private _repo: IWorkModeRepository,
    @inject('WorkModeMapper') private _mapper: WorkModeMapper
  ) {}

  async execute(dto: GetWorkModsDTO): Promise<PaginatedWorkModesDTO | null> {
    const { search, page, limit } = dto;

    const result = await this._repo.getWorkModesAggregated(search, limit, page);
    if (result) {
      console.log('--checking result in the amn usecase---> ', result);
      const dto: WorkModeDTO[] = [];
      result.workModes.forEach((workMode: WorkMode) =>
        dto.push(this._mapper.entityToDTO(workMode))
      );
      return { workModes: dto, totalPages: result.totalPages };
    }

    return null;
  }
}
