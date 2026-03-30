import { inject, injectable } from 'tsyringe';
import IAdminDeletePlanUsecase from '../../interfaces/usecases/plan/IAdminDeletePlan.usecase';
import { IPlanRepository } from '../../../domain/interfaces/plan/IPlanRepository';
import { PlanDTO } from '../../DTOs/plan/plan.dto';
import { PlanMapper } from '../../mappers/plan/plan.mapperClass';

@injectable()
export default class AdminDeletePlanUsecase implements IAdminDeletePlanUsecase {
  constructor(
    @inject('IPlanRepository') private _repo: IPlanRepository,
    @inject('PlanMapper') private _mapper: PlanMapper
  ) {}

  async execute(planId: string): Promise<PlanDTO | null> {
    const result = await this._repo.update(planId, { isDeleted: true });
    return result ? this._mapper.planEntityToPlanDTO(result) : null;
  }
}
