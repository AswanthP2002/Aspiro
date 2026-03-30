import { FollowersDTO, GetFollowersRequestDTO } from '../../../DTOs/follow/follow.dto';

export default interface IGetFollowersUsecase {
  execute(dto: GetFollowersRequestDTO): Promise<FollowersDTO[] | null>;
}
