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
                userId: '$userDetails._id',
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
          free: [
            {
              $lookup: {
                from: 'plans',
                localField: 'planId',
                foreignField: '_id',
                as: 'planDetails',
              },
            },
            {
              $match: {
                'planDetails.monthlyPrice': 0,
              },
            },
            { $count: 'docs' },
          ],
          premium: [
            {
              $lookup: {
                from: 'plans',
                localField: 'planId',
                foreignField: '_id',
                as: 'planDetails',
              },
            },
            {
              $match: {
                'planDetails.monthlyPrice': { $gt: 0 },
              },
            },
            { $count: 'docs' },
          ],
          recruiters: [
            {
              $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'userDetails',
              },
            },
            {
              $match: {
                'userDetails.role': { $in: ['recruiter'] },
              },
            },
            { $count: 'docs' },
          ],
          nonRecruiters: [
            {
              $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'userDetails',
              },
            },
            {
              $match: {
                'userDetails.role': { $nin: ['recruiter'] },
              },
            },
            { $count: 'docs' },
          ],
          freelancers: [
            {
              $lookup: {
                from: 'recruiters',
                localField: 'userId',
                foreignField: 'userId',
                as: 'recruiterDetails',
              },
            },
            {
              $match: {
                'recruiterDetails.recruiterType': 'freelance',
              },
            },
            { $count: 'docs' },
          ],
          corporate: [
            {
              $lookup: {
                from: 'recruiters',
                localField: 'userId',
                foreignField: 'userId',
                as: 'recruiterDetails',
              },
            },
            {
              $match: {
                'recruiterDetails.recruiterType': 'corporate',
              },
            },
            { $count: 'docs' },
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
          subscriptionCategoryData: [
            { label: 'Free Users', value: data.free[0]?.docs || 0, color: '#0088fe' },
            { label: 'Premium Users', value: data.premium[0]?.docs || 0, color: '#00e49f' },
          ],
          recruiterTypeData: [
            { label: 'Freelancers', value: data.freelancers[0]?.docs || 0, color: '#ffbb28' },
            { label: 'Corporate', value: data.corporate[0]?.docs || 0, color: '#52ecd7' },
          ],
          userTypeData: [
            { label: 'Recruiters', value: data.recruiters[0]?.docs || 0, color: '#d5f968' },
            { label: 'Non-Recruiters', value: data.nonRecruiters[0]?.docs || 0, color: '#22de32' },
          ],
        },
        revenueGrowth: data.revenueGrowth.map((item: { _id: number; amount: number }) => ({
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
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
      {
        $unwind: {
          path: '$userDetails',
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);

    return result[0];
  }

  async findOneWithUserId(userId: string): Promise<UserSubscription | null> {
    const result = await UserSubscriptionDAO.findOne({
      userId: new mongoose.Types.ObjectId(userId),
    });

    return result;
  }

  async updateFeatureJobApplicationCountByUserId(
    userId: string,
    count: string
  ): Promise<UserSubscription | null> {
    if (!mongoose.isValidObjectId(userId)) return null;

    const result = await UserSubscriptionDAO.findOneAndUpdate(
      { userId: new mongoose.Types.ObjectId(userId) },
      { $set: { 'features.jobApplications': count } },
      { returnDocument: 'after' }
    );

    return result;
  }

  async findSubscriptionsByPlanId(planId: string): Promise<UserSubscription[] | null> {
    const subscriptions = await UserSubscriptionDAO.find({
      planId: new mongoose.Types.ObjectId(planId),
    });

    return subscriptions;
  }

  async updateByStripeSubscriptionId(
    stripeSubscriptionId: string,
    data: Partial<UserSubscription>
  ): Promise<UserSubscription | null> {
    const result = await UserSubscriptionDAO.findOneAndUpdate(
      { stripeSubscriptionId: stripeSubscriptionId },
      { $set: data },
      { returnDocument: 'after' }
    );

    return result;
  }

  async findSubscriptionByPlanIdAndUserId(
    userId: string,
    planId: string
  ): Promise<UserSubscription | null> {
    const result = await UserSubscriptionDAO.findOne({
      planId: new mongoose.Types.ObjectId(planId),
      userId: new mongoose.Types.ObjectId(userId),
    });

    return result;
  }

  async updateFeaturesConnectionRequestCountByUserId(
    userId: string,
    count: string
  ): Promise<UserSubscription | null> {
    const result = await UserSubscriptionDAO.findOneAndUpdate(
      { userId: new mongoose.Types.ObjectId(userId) },
      { $set: { 'features.connectionRequests': count } },
      { returnDocument: 'after' }
    );

    return result;
  }

  async updateFeaturesJobCreationCountByUserId(
    userId: string,
    count: string
  ): Promise<UserSubscription | null> {
    const result = await UserSubscriptionDAO.findOneAndUpdate(
      { userId: new mongoose.Types.ObjectId(userId) },
      { $set: { 'features.jobApplications': count } },
      { returnDocument: 'after' }
    );

    return result;
  }

  async getSubscriptionAndPlanDetailsBySubscriptionId(
    subscriptionId: string
  ): Promise<UserSubscriptionAndPlanDetails | null> {
    const result = await UserSubscriptionDAO.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(subscriptionId),
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
      {
        $unwind: {
          path: '$planDetails',
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);

    return result[0];
  }
}
