import { inject, injectable } from 'tsyringe';
import { IAdminTogglePlanListingUsecase } from '../../interfaces/usecases/plan/IAdminTogglePlanListing.usecase';
import { IPlanRepository } from '../../../domain/interfaces/plan/IPlanRepository';
import { PlanMapper } from '../../mappers/plan/plan.mapperClass';
import { AdminTogglePlanListingRequestDTO, PlanDTO } from '../../DTOs/plan/plan.dto';

@injectable()
export default class AdminTogglePlanListingUsecase implements IAdminTogglePlanListingUsecase {
  constructor(
    @inject('IPlanRepository') private _repo: IPlanRepository,
    @inject('PlanMapper') private _mapper: PlanMapper
  ) {}

  async execute(dto: AdminTogglePlanListingRequestDTO): Promise<PlanDTO | null> {
    const { planId, status } = dto;

    if (status === 'LIST') {
      const result = await this._repo.update(planId, { isActive: true, isListed: true });
      return result ? this._mapper.planEntityToPlanDTO(result) : null;
    } else {
      const result = await this._repo.update(planId, { isActive: false, isListed: false });
      return result ? this._mapper.planEntityToPlanDTO(result) : null;
    }

    return null;
  }
}
