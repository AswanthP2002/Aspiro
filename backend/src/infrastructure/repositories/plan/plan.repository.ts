import mongoose from 'mongoose';
import { Plan, PlanWithActiveUsersCount } from '../../../domain/entities/plan/plan.entity';
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
  }

  async findVisiblePlans(): Promise<Plan[] | null> {
    const result = await PlanDAO.find({
      isDeleted: false,
      isListed: true,
    }).lean();

    return result;
  }

  async findPlanActiveSubscribers(planId: string): Promise<{ activeSubscribers: number } | null> {
    const result = await PlanDAO.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(planId),
        },
      },
      {
        $lookup: {
          from: 'subscriptions',
          localField: '_id',
          foreignField: 'planId',
          as: 'subscribers',
        },
      },
      {
        $unwind: {
          path: '$subscribers',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          'subscribers.status': 'active',
        },
      },
      { $count: 'activeSubscribers' },
    ]);

    const activeSubscribers = result[0]?.activeSubscribers ?? 0;
    return { activeSubscribers };
  }

  async findPlansWithActiveUsers(
    page: number,
    limit: number
  ): Promise<{ plans: PlanWithActiveUsersCount[]; totalPages: number } | null> {
    const skip = (page - 1) * limit;
    const result = await PlanDAO.aggregate([
      {
        $match: {
          isListed: true,
          isActive: true,
          isDeleted: false,
        },
      },
      {
        $facet: {
          plans: [
            {
              $sort: { createdAt: -1 },
            },
            {
              $skip: skip,
            },
            {
              $limit: limit,
            },
            {
              $lookup: {
                from: 'subscriptions',
                let: { planId: '$_id' },
                pipeline: [
                  {
                    $match: {
                      status: 'active',
                      $expr: {
                        $eq: ['$planId', '$$planId'],
                      },
                    },
                  },
                  {
                    $count: 'count',
                  },
                ],
                as: 'subscribers',
              },
            },
            {
              $addFields: {
                activeUsers: {
                  $ifNull: [{ $arrayElemAt: ['$subscribers.count', 0] }, 0],
                },
              },
            },
          ],
          totalDocs: [{ $count: 'count' }],
        },
      },
    ]);

    const plans = result[0]?.plans || [];
    const totalDocs = result[0]?.totalDocs[0]?.count;
    const totalPages = Math.ceil(totalDocs / limit);

    return { plans, totalPages };
  }

  async findPlanByStripePriceId(stripePriceId: string): Promise<Plan | null> {
    const result = await PlanDAO.findOne({ stripePriceId: stripePriceId });

    return result;
  }
}
