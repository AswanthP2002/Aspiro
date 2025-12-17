import IFollowRepo from '../../domain/interfaces/IFollowRepo';
import FollowUserDTO, { FollowUserResDTO } from '../DTOs/follow.dto';
import mapToFollowDTOFromFollow from '../mappers/mapToDTOFromFollow.mapper';
import mapToFollowFromDTO from '../mappers/mapToFollowFromDTO.mapper';
import IFollowUserUseCase from '../interfaces/usecases/user/IFollowUser.usecase';
import { inject, injectable } from 'tsyringe';
import INotificationRepo from '../../domain/interfaces/INotificationRepo';

@injectable()
export default class FollowUseruseCse implements IFollowUserUseCase {
  constructor(
    @inject('IFollowRepository') private _repo: IFollowRepo,
    @inject('INotificationRepository') private _notificationRepo: INotificationRepo
  ) {}

  async execute(followUserDto: FollowUserDTO): Promise<FollowUserResDTO | null> {
    try {
      const {follower, following, acted_by, acted_user_avatar} = followUserDto

      if (follower === following) {
        throw new Error('Duplicate : You cant follow yourself');
      }
      const newFollow = mapToFollowFromDTO(followUserDto);
      
      //follow user
      const result = await this._repo.create(newFollow);

      //create notification and store it
      await this._notificationRepo.create({
        recepientId:following,
        type:'USER_ACTION',
        category:'FOLLOW',
        targetType:'USER',
        targetId:follower,
        message:`New follower! '${acted_by}' started following you`,
        metaData:{
          acted_by,
          user_avatar:acted_user_avatar
        }
      })
  
      if (result) {
        const dto = mapToFollowDTOFromFollow(result);
        return dto;
      }
  
      return null;
    } catch (error) {
      throw error
    }
  }
}
