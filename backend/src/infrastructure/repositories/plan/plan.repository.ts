import { Plan } from '../../../domain/entities/plan/plan.entity';
import { IPlanRepository } from '../../../domain/interfaces/plan/IPlanRepository';
import { PlanDAO } from '../../database/Schemas/plan/plan.schema';
import BaseRepository from '../baseRepository';

export class PlanRepository extends BaseRepository<Plan> implements IPlanRepository {
  constructor() {
    super(PlanDAO);
  }

  async findPlanByName(name: string): Promise<Plan | null> {
    const plan = await PlanDAO.findOne({ name: { $regex: new RegExp(name, 'i') } });
    return plan;
  }

  async findPlans(
    page: number,
    limit: number
  ): Promise<{ plans: Plan[]; totalPages: number } | null> {
    const skip = (page - 1) * limit;
    const result = await PlanDAO.aggregate([
      { $match: { isDeleted: false } },
      {
        $facet: {
          plans: [{ $sort: { createdAt: -1 } }, { $skip: skip }, { $limit: limit }],
          metaData: [{ $count: 'totalDocs' }],
        },
      },
    ]);

    const plans = result[0]?.plans;
    const totalDocs = result[0]?.metaData[0]?.totalDocs;
    const totalPages = Math.ceil(totalDocs / limit);
    return { plans, totalPages };
    // const result = await PlanDAO.find({ isDeleted: false })
    //   .sort({ createdAt: -1 })
    //   .skip(skip)
    //   .limit(limit)
    //   .lean();
    // return result;
  }

  async findVisiblePlans(): Promise<Plan[] | null> {
    const result = await PlanDAO.find({
      isDeleted: false,
      isListed: true,
    }).lean();

    return result;
  }
}
