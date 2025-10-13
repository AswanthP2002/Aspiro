import IFollowRepo from '../../domain/interfaces/IFollowRepo';
import FollowUserDTO, { FollowUserResDTO } from '../DTOs/follow.dto';
import mapToFollowDTOFromFollow from '../mappers/mapToDTOFromFollow.mapper';
import mapToFollowFromDTO from '../mappers/mapToFollowFromDTO.mapper';
import IFollowUserUseCase from './interfaces/IFollowUser.usecase';

export default class FollowUseruseCse implements IFollowUserUseCase {
  constructor(private _repo: IFollowRepo) {}

  async execute(
    followUserDto: FollowUserDTO
  ): Promise<FollowUserResDTO | null> {
    if (followUserDto.follower === followUserDto.following) {
      throw new Error('Duplicate : You cant follow yourself');
    }
    const newFollow = mapToFollowFromDTO(followUserDto);
    const result = await this._repo.create(newFollow);

    if (result) {
      const dto = mapToFollowDTOFromFollow(result);
      return dto;
    }

    return null;
  }
}
