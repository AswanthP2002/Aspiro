import { inject, injectable } from 'tsyringe';
import IAdminEditPlanUsecase from '../../interfaces/usecases/plan/IAdminEditPlan.usecase';
import { IPlanRepository } from '../../../domain/interfaces/plan/IPlanRepository';
import { PlanMapper } from '../../mappers/plan/plan.mapperClass';
import { EditPlanDTO, PlanDTO } from '../../DTOs/plan/plan.dto';

@injectable()
export default class AdminEditplanUsecase implements IAdminEditPlanUsecase {
  constructor(
    @inject('IPlanRepository') private _repo: IPlanRepository,
    @inject('PlanMapper') private _mapper: PlanMapper
  ) {}

  async execute(dto: EditPlanDTO): Promise<PlanDTO | null> {
    const data = this._mapper.editPlanDTOToPlanEntity(dto);
    const result = await this._repo.update(dto._id as string, data);
    if (result) {
      return this._mapper.planEntityToPlanDTO(result);
    }

    return null;
  }
}
