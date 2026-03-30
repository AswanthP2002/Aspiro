import { injectable } from 'tsyringe';
import { Plan } from '../../../domain/entities/plan/plan.entity';
import { CreatePlanDTO, EditPlanDTO, PlanDTO } from '../../DTOs/plan/plan.dto';

@injectable()
export class PlanMapper {
  public createPlanDTOToPlanEntity(data: CreatePlanDTO): Plan {
    return {
      name: data.name,
      badgeIcon: data.badgeIcon,
      billingCycle: data.billingCycle,
      currency: data.currency,
      description: data.description,
      features: data.features,
      featuresListed: data.featuresListed,
      isActive: data.isActive,
      isListed: data.isListed,
      monthlyPrice: data.monthlyPrice,
      trialPeriod: data.trialPeriod,
      yearlyPrice: data.yearlyPrice,
    };
  }

  public editPlanDTOToPlanEntity(data: EditPlanDTO): Plan {
    return { ...data };
  }

  public planEntityToPlanDTO(data: Plan): PlanDTO {
    return {
      _id: data._id,
      name: data.name,
      badgeIcon: data.badgeIcon,
      billingCycle: data.billingCycle,
      currency: data.currency,
      description: data.description,
      features: data.features,
      featuresListed: data.featuresListed,
      isActive: data.isActive,
      isListed: data.isListed,
      monthlyPrice: data.monthlyPrice,
      yearlyPrice: data.yearlyPrice,
      trialPeriod: data.trialPeriod,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}
