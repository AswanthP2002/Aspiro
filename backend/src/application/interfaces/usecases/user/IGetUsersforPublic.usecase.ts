import { GetUsersForPublicDTO } from '../../../DTOs/user/candidate.dto';
import { PaginatedUserOverviewForPublicDTO } from '../../../DTOs/user/userOverviewForPublic.dto';

export default interface IGetUsersForPublicUsecase {
  execute(
    getCandidatesDto: GetUsersForPublicDTO
  ): Promise<PaginatedUserOverviewForPublicDTO | null>;
}
