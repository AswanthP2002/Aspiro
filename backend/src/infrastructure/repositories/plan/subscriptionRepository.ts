import { injectable } from 'tsyringe';
import UserSubscription, {
  UserSubscriptionAndPlanDetails,
} from '../../../domain/entities/plan/userSubscription.entity';
import ISubscriptionRepo from '../../../domain/interfaces/plan/ISubscriptionRepo';
import { UserSubscriptionDAO } from '../../database/Schemas/plan/userSubscription.schema';
import BaseRepository from '../baseRepository';
import { SubscriptionAnalyticsDTO } from '../../../application/DTOs/subscription/subscriptionAnalytics.dto';
import mongoose from 'mongoose';

@injectable()
export default class SubscriptionRepository
  extends BaseRepository<UserSubscription>
  implements ISubscriptionRepo
{
  constructor() {
    super(UserSubscriptionDAO);
  }

  async getAdminAnalyticsData(
    search: string,
    page: number,
    limit: number,
    status: string[]
  ): Promise<{ data: SubscriptionAnalyticsDTO; totalPages: number } | null> {
    const skip = (page - 1) * limit;
    const result = await UserSubscriptionDAO.aggregate([
      {
        $lookup: {
          from: 'plans',
          localField: 'planId',
          foreignField: '_id',
          as: 'planDetails',
        },
      },
      { $unwind: '$planDetails' },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
      { $unwind: '$userDetails' },
      {
        $facet: {
          stats: [
            {
              $group: {
                _id: null,
                totalMRR: {
                  $sum: { $cond: [{ $eq: ['$status', 'active'] }, '$planDetails.monthlyPrice', 0] },
                },
                activeRecruiters: {
                  $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] },
                },
              },
            },
          ],
          subscribers: [
            {
              $match: {
                'userDetails.name': {
                  $regex: new RegExp(search, 'i'),
                },
                status: { $in: status },
              },
            },
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },
            {
              $project: {
                userName: '$userDetails.name',
                userEmail: '$userDetails.email',
                planName: '$planDetails.name',
                billingCycle: '$planDetails.billingCycle',
                nextRenewal: '$currentPeriodEnd',
                amount: '$planDetails.monthlyPrice',
                paymentStatus: '$paymentStatus',
                status: '$status',
              },
            },
          ],
          subscribersCount: [
            {
              $match: {
                'userDetails.name': {
                  $regex: new RegExp(search, 'i'),
                },
                status: { $in: status },
              },
            },
            { $count: 'total' },
          ],
          revenueGrowth: [
            {
              $group: {
                _id: { $month: '$createdAt' },
                amount: { $sum: '$planDetails.monthlyPrice' },
              },
            },
            { $sort: { _id: 1 } },
          ],
        },
      },
    ]);

    const data = result[0];
    const totalDocs = data.subscribersCount[0]?.total;
    const totalPages = Math.ceil(totalDocs / limit);
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    return {
      data: {
        stats: {
          totalMRR: data.stats[0]?.totalMRR || 0,
          activeRecruiters: data.stats[0]?.activeRecruiters || 0,
          churnRate: 0,
        },
        revenueGrowth: data.revenueGrowth.map((item: any) => ({
          month: months[item._id - 1],
          amount: item.amount,
        })),
        subscribers: data.subscribers,
      },
      totalPages: totalPages,
    };
  }

  async getUserSubscriptionDetails(userId: string): Promise<UserSubscriptionAndPlanDetails | null> {
    const result = await UserSubscriptionDAO.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: 'plans',
          localField: 'planId',
          foreignField: '_id',
          as: 'planDetails',
        },
      },
      { $unwind: { path: '$planDetails', preserveNullAndEmptyArrays: true } },
    ]);

    return result[0];
  }

  async findOneWithUserId(userId: string): Promise<UserSubscription | null> {
    const result = await UserSubscriptionDAO.findOne({
      userId: new mongoose.Types.ObjectId(userId),
    });

    return result;
  }

  // async getUsersPurchasedCurrentDay(): Promise<{ count: number } | null> {
  //   const today = new Date();
  //   today.setHours(0, 0, 0, 0);
  //   const countOfUsersPurchaseToday = await UserSubscriptionDAO.aggregate([
  //     {
  //       $match: {
  //         createdAt: { $gte: today },
  //       },
  //     },
  //     { $count: 'count' },
  //   ]);

  //   const count = countOfUsersPurchaseToday[0];
  // }
}
