import UpdateProfileViewDTO from '../../../DTOs/user/updateProfileView.dto';

export default interface IUpdateProfileViewUsecase {
  execute(dto: UpdateProfileViewDTO): Promise<{ _id: string; views: string[] } | null>;
}
