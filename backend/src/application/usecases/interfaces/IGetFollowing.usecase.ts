import Follow from '../../../domain/entities/follow.entity';

export default interface IGetFollowingUseCase {
  execute(userId: string): Promise<Follow[] | null>;
}
