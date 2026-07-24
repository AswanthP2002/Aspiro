import { Plan, PlanWithActiveUsersCount } from '../../entities/plan/plan.entity';
import IBaseRepo from '../IBaseRepo';

export interface IPlanRepository extends IBaseRepo<Plan> {
  _placeholder?: never;
  findPlanByName(name: string): Promise<Plan | null>;
  findPlans(page: number, limit: number): Promise<{ plans: Plan[]; totalPages: number } | null>;
  findVisiblePlans(): Promise<Plan[] | null>;
  findPlanActiveSubscribers(planId: string): Promise<{ activeSubscribers: number } | null>;
  findPlansWithActiveUsers(
    page: number,
    limit: number
  ): Promise<{ plans: PlanWithActiveUsersCount[]; totalPages: number } | null>;
  findPlanByStripePriceId(stripePriceId: string): Promise<Plan | null>
}
