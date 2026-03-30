import { inject, injectable } from 'tsyringe';
import IPostRepo from '../../../domain/interfaces/IPostRepo';
import IUnlikePostUsecase from '../../interfaces/usecases/post/IUnlikePost.usecase';
import { PostDTO } from '../../DTOs/post/post.dto';
import mapToPostDTOFromPost from '../../mappers/post/mapToPostDTOFromPost.mapper';
import IRealTimeEventEmitter from '../../interfaces/services/IRealTimeEventEmitter';
import INotificationRepo from '../../../domain/interfaces/INotificationRepo';

@injectable()
export default class UnlikePostUsecase implements IUnlikePostUsecase {
  constructor(
    @inject('IRealTimeEventEmitter') private _realTimeEventEmitter: IRealTimeEventEmitter,
    @inject('INotificationRepository') private _notificationRepo: INotificationRepo,
    @inject('IPostRepository') private _postRepo: IPostRepo
  ) {}

  async execute(postId: string, userId: string): Promise<PostDTO | null> {
    const result = await this._postRepo.unlikePost(postId, userId);

    if (result) {
      await this._notificationRepo.deleteLikeNotificationByActorCategoryPostId(
        postId,
        userId,
        'LIKE'
      );
      const postDto = mapToPostDTOFromPost(result);

      //brodcast the like event to all users
      this._realTimeEventEmitter.postUnliked(postId, userId);

      return postDto;
    }

    return result;
  }
}
