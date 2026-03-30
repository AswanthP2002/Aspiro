import { FollowingsDTO, GetFollowingsRequestDTO } from '../../../DTOs/follow/follow.dto';

export interface IGetFollowingsUsecase {
  execute(dto: GetFollowingsRequestDTO): Promise<FollowingsDTO[] | null>;
}
