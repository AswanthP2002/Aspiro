import userProfileAggregatedAdminDTO from '../../../DTOs/admin/userProfileAggregatedAdminDTO';

export default interface IAdminLoadUserDetailsUsecase {
  execute(userId: string): Promise<userProfileAggregatedAdminDTO | null>;
}
