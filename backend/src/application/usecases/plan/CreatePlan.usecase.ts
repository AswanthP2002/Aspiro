import { inject, injectable } from 'tsyringe';
import ICreatePlanUsecase from '../../interfaces/usecases/plan/ICreatePlan.usecase';
import { PlanMapper } from '../../mappers/plan/plan.mapperClass';
import { PlanRepository } from '../../../infrastructure/repositories/plan/plan.repository';
import { CreatePlanDTO, PlanDTO } from '../../DTOs/plan/plan.dto';
import { ResourceAlreadyExistError } from '../../../domain/errors/AppError';

@injectable()
export default class CreatePlanUsecase implements ICreatePlanUsecase {
  constructor(
    @inject('PlanMapper') private _mapper: PlanMapper,
    @inject('IPlanRepository') private _repo: PlanRepository
  ) {}

  async execute(dto: CreatePlanDTO): Promise<PlanDTO | null> {
    const newPlan = this._mapper.createPlanDTOToPlanEntity(dto);
    const isExisting = await this._repo.findPlanByName(newPlan.name);
    if (isExisting) {
      throw new ResourceAlreadyExistError('Subscription plan');
    }
    const result = await this._repo.create(newPlan);

    if (result) {
      return this._mapper.planEntityToPlanDTO(result);
    }

    return null;
  }
}
