import { inject, injectable } from 'tsyringe';
import IAdminGetPlansUsecase from '../../interfaces/usecases/plan/IAdminGetPlans.usecase';
import { IPlanRepository } from '../../../domain/interfaces/plan/IPlanRepository';
import { PlanMapper } from '../../mappers/plan/plan.mapperClass';
import { AdminGetPlanRequestDTO, PlanDTO } from '../../DTOs/plan/plan.dto';
import { Plan } from '../../../domain/entities/plan/plan.entity';

@injectable()
export default class AdminGetPlansUsecase implements IAdminGetPlansUsecase {
  constructor(
    @inject('IPlanRepository') private _repo: IPlanRepository,
    @inject('PlanMapper') private _mapper: PlanMapper
  ) {}

  async execute(
    dto: AdminGetPlanRequestDTO
  ): Promise<{ plans: PlanDTO[]; totalPages: number } | null> {
    const { page, limit } = dto;
    const result = await this._repo.findPlans(page, limit);
    if (result) {
      const dto: PlanDTO[] = [];
      result.plans.forEach((data: Plan) => dto.push(this._mapper.planEntityToPlanDTO(data)));

      return { plans: dto, totalPages: result.totalPages };
    }

    return null;
  }
}
