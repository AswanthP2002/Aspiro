import { inject, injectable } from 'tsyringe';
import ICreatePlanUsecase from '../../interfaces/usecases/plan/ICreatePlan.usecase';
import { PlanMapper } from '../../mappers/plan/plan.mapperClass';
import { PlanRepository } from '../../../infrastructure/repositories/plan/plan.repository';
import { CreatePlanDTO, PlanDTO } from '../../DTOs/plan/plan.dto';
import { ResourceAlreadyExistError } from '../../../domain/errors/AppError';
import { ISubscriptionService } from '../../interfaces/services/IPayment.services';

@injectable()
export default class CreatePlanUsecase implements ICreatePlanUsecase {
  constructor(
    @inject('PlanMapper') private _mapper: PlanMapper,
    @inject('IPlanRepository') private _repo: PlanRepository,
    @inject('ISubscriptionService') private _subscriptionService: ISubscriptionService
  ) {}

  async execute(dto: CreatePlanDTO): Promise<PlanDTO | null> {
    const newPlan = this._mapper.createPlanDTOToPlanEntity(dto);
    const isExisting = await this._repo.findPlanByName(newPlan.name);
    if (isExisting) {
      throw new ResourceAlreadyExistError('Subscription plan');
    }
    console.log('Checking dto before creating plan', dto);
    if (parseInt(dto.monthlyPrice.toString()) === 0) {
      console.log('Monthly price is 0 = Free  plan -> not interfering with stripe');
      const result = await this._repo.create(newPlan);
      console.log('Returning');
      return result ? this._mapper.planEntityToPlanDTO(result) : null;
    }

    //createing product in stripe
    const { productId } = await this._subscriptionService.createProduct(
      newPlan.name,
      newPlan.description
    );

    //creating price object in stripe
    const { priceId } = await this._subscriptionService.createPrice(
      productId,
      newPlan.monthlyPrice
    );

    const result = await this._repo.create({
      ...newPlan,
      stripeProductId: productId,
      stripePriceId: priceId,
    });

    if (result) {
      return this._mapper.planEntityToPlanDTO(result);
    }

    return null;
  }
}
