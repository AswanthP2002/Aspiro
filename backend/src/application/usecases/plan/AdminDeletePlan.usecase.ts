import { inject, injectable } from 'tsyringe';
import IAdminDeletePlanUsecase from '../../interfaces/usecases/plan/IAdminDeletePlan.usecase';
import { IPlanRepository } from '../../../domain/interfaces/plan/IPlanRepository';
import { PlanDTO } from '../../DTOs/plan/plan.dto';
import { PlanMapper } from '../../mappers/plan/plan.mapperClass';
import { ISubscriptionService } from '../../interfaces/services/IPayment.services';
import { ResourceAlreadyExistError, ResourceNotFound } from '../../../domain/errors/AppError';

@injectable()
export default class AdminDeletePlanUsecase implements IAdminDeletePlanUsecase {
  constructor(
    @inject('IPlanRepository') private _repo: IPlanRepository,
    @inject('PlanMapper') private _mapper: PlanMapper,
    @inject('ISubscriptionService') private _subscriptionService: ISubscriptionService
  ) {}

  async execute(planId: string): Promise<PlanDTO | null> {
    const existingPlanDetails = await this._repo.findById(planId);

    if (existingPlanDetails) {
      if (existingPlanDetails.monthlyPrice > 0) {
        await this._subscriptionService.updateProductStatusInactive(
          existingPlanDetails.stripeProductId as string
        );
      }

      const result = await this._repo.update(planId, {
        isDeleted: true,
        isListed: false,
        isActive: false,
      });
      return result ? this._mapper.planEntityToPlanDTO(result) : null;
    }

    return null;
  }
}
