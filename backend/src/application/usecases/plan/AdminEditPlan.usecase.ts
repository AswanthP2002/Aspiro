import { inject, injectable } from 'tsyringe';
import IAdminEditPlanUsecase from '../../interfaces/usecases/plan/IAdminEditPlan.usecase';
import { IPlanRepository } from '../../../domain/interfaces/plan/IPlanRepository';
import { PlanMapper } from '../../mappers/plan/plan.mapperClass';
import { EditPlanDTO, PlanDTO } from '../../DTOs/plan/plan.dto';
import { ISubscriptionService } from '../../interfaces/services/IPayment.services';

@injectable()
export default class AdminEditplanUsecase implements IAdminEditPlanUsecase {
  constructor(
    @inject('IPlanRepository') private _repo: IPlanRepository,
    @inject('PlanMapper') private _mapper: PlanMapper,
    @inject('ISubscriptionService') private _subscriptionService: ISubscriptionService
  ) {}

  async execute(dto: EditPlanDTO): Promise<PlanDTO | null> {
    let data = this._mapper.editPlanDTOToPlanEntity(dto);

    const existingPlan = await this._repo.findById(dto._id as string);

    if (existingPlan && existingPlan.name !== dto.name) {
      await this._subscriptionService.updateProductName(
        existingPlan.stripeProductId as string,
        dto.name
      );
    }

    if (existingPlan && existingPlan.description !== dto.description) {
      await this._subscriptionService.updateProductDescription(
        existingPlan.stripeProductId as string,
        dto.description
      );
    }

    if (existingPlan && existingPlan.monthlyPrice !== dto.monthlyPrice) {
      const { priceId } = await this._subscriptionService.createPrice(
        existingPlan.stripeProductId as string,
        dto.monthlyPrice
      );

      data = {
        ...data,
        stripePriceId: priceId,
      };
    }

    const result = await this._repo.update(dto._id as string, data);
    if (result) {
      return this._mapper.planEntityToPlanDTO(result);
    }

    return null;
  }
}
