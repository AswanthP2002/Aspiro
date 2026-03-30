import { inject, injectable } from 'tsyringe';
import { GetFollowingsRequestDTO, FollowingsDTO } from '../../DTOs/follow/follow.dto';
import { IGetFollowingsUsecase } from '../../interfaces/usecases/follow/IGetFollowingsUsecase';
import IFollowRepo from '../../../domain/interfaces/IFollowRepo';
import FollowMapper from '../../mappers/follow/Follow.mapperClass';
import FollowerUserDetails from '../../../domain/entities/follow/followerUserDetails.entity';

@injectable()
export class GetFollowingsUsecase implements IGetFollowingsUsecase {
  constructor(
    @inject('IFollowRepository') private _repo: IFollowRepo,
    @inject('FollowMapper') private _mapper: FollowMapper
  ) {}

  async execute(dto: GetFollowingsRequestDTO): Promise<FollowingsDTO[] | null> {
    const { userId, search, page, limit } = dto;
    const result = await this._repo.getFollowing(userId, search, page, limit);
    if (result) {
      const dto: FollowingsDTO[] = [];
      result.forEach((data: FollowerUserDetails) => {
        dto.push(this._mapper.followingUserDetailsToFolloingDTO(data));
      });

      return dto;
    }

    return null;
  }
}
