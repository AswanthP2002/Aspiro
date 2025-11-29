import userProfileAggregatedAdminDTO from '../../../DTOs/userProfileAggregatedDTO';

export default interface IAdminLoadUserDetailsUsecase {
  execute(userId: string): Promise<userProfileAggregatedAdminDTO | null>;
}
