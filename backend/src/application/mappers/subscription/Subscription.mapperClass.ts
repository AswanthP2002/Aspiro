import { UserSubscriptionAndPlanDetails } from '../../../domain/entities/plan/userSubscription.entity';
import UserSubscriptionDetailsDTO from '../../DTOs/user/userSubscriptionDetails.dto';

export default class SubscriptionMapper {
  public mapUserSubscriptionPlanDetailsToDTO(
    data: UserSubscriptionAndPlanDetails
  ): UserSubscriptionDetailsDTO {
    let userLocation = '';
    if (data.userDetails?.location) {
      const { city, district, state } = data.userDetails.location;
      userLocation = `${city}, ${district}, ${state}`;
    }
    return {
      _id: data.userDetails?._id as string,
      name: data.userDetails?.name as string,
      email: data.userDetails?.email as string,
      phone: data.userDetails?.phone as string,
      location: userLocation,
      joinedAt: data.userDetails?.createdAt as string,
      subscriptionMetaData: data.userDetails?.subscriptionMetaData as {
        action: string;
        date: string | Date;
      }[],
      subscriptionDetails: {
        _id: data._id as string,
        planId: data.planId as string,
        currentPeriodEnds: data.currentPeriodEnd as string,
        stripeCustomerId: data.stripeCustomerId as string,
        stripeSubscriptionId: data.stripeSubscriptionId as string,
        features: data.features as { [key: string]: string | number | boolean },
      },
      planDetails: {
        _id: data.planDetails._id as string,
        name: data.planDetails.name as string,
        monthlyPrice: data.planDetails.monthlyPrice,
      },
    };
  }
}
