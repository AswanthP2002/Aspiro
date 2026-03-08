import { inject, injectable } from 'tsyringe';
import IPostRepo from '../../../domain/interfaces/IPostRepo';
import ILikePostUsecase from '../../interfaces/usecases/user/ILikePost.usecase';
import { PostDTO } from '../../DTOs/post.dto';
import mapToPostDTOFromPost from '../../mappers/mapToPostDTOFromPost.mapper';
import IRealTimeEventEmitter from '../../interfaces/services/IRealTimeEventEmitter';
import INotificationRepo from '../../../domain/interfaces/INotificationRepo';
import LikePostDTO from '../../DTOs/user/likePost.dto';
import Notification from '../../../domain/entities/notification.entity';

@injectable()
export default class LikePostUsecase implements ILikePostUsecase {
  constructor(
    @inject('IRealTimeEventEmitter') private _realTimeEventEmitter: IRealTimeEventEmitter,
    @inject('IPostRepository') private _postRepo: IPostRepo,
    @inject('INotificationRepository') private _notificationRepo: INotificationRepo
  ) {}

  async execute(dto: LikePostDTO): Promise<PostDTO | null> {
    const { postId, acted_by, acted_user_avatar, actorId, ownerId } = dto;
    const result = await this._postRepo.likePost(postId, actorId);

    if (result) {
      const postDto = mapToPostDTOFromPost(result);
      const newNotification = await this._notificationRepo.create({
        category: 'LIKE',
        recepientId: ownerId,
        actorId: actorId,
        message: `${acted_by} liked your post`,
        targetId: postId,
        targetUrl: `/posts/${postId}`,
        metadata: {
          acted_by,
          acted_user_avatar,
          content: postDto.description,
        },
      });

      //brodcast the like event to all users
      //this._realTimeEventEmitter.postLiked(newNotification as Notification);

      return postDto;
    }

    return result;
  }
}
