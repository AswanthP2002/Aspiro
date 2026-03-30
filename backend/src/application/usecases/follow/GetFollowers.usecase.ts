import { inject, injectable } from 'tsyringe';
import IFollowRepo from '../../../domain/interfaces/IFollowRepo';
import { FollowersDTO, GetFollowersRequestDTO } from '../../DTOs/follow/follow.dto';
import IGetFollowersUsecase from '../../interfaces/usecases/follow/IGetFollowers.usecase';
import FollowMapper from '../../mappers/follow/Follow.mapperClass';
import FollowerUserDetails from '../../../domain/entities/follow/followerUserDetails.entity';

@injectable()
export default class GetFollowersUseCase implements IGetFollowersUsecase {
  constructor(
    @inject('IFollowRepository') private _repo: IFollowRepo,
    @inject('FollowMapper') private _mapper: FollowMapper
  ) {}

  async execute(dto: GetFollowersRequestDTO): Promise<FollowersDTO[] | null> {
    const { userId, page, limit, search } = dto;
    const followers = await this._repo.getFollowers(userId, search, page, limit);
    if (followers) {
      const dto: FollowersDTO[] = [];
      followers.forEach((follwerDetails: FollowerUserDetails) => {
        dto.push(this._mapper.followerUserDetailsToFollowerDTO(follwerDetails));
      });

      return dto;
    }

    return null;
  }
}
