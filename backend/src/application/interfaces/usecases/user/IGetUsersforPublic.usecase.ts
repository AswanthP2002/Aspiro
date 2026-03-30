import { GetUsersForPublicDTO } from '../../../DTOs/user/getUsersForPublic.dto';
import { PaginatedUserOverviewForPublicDTO } from '../../../DTOs/user/userOverviewForPublic.dto';

export default interface IGetUsersForPublicUsecase {
  execute(
    getCandidatesDto: GetUsersForPublicDTO
  ): Promise<PaginatedUserOverviewForPublicDTO | null>;
}
