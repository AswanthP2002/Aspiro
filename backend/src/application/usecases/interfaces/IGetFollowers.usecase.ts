import Follow from '../../../domain/entities/follow.entity';

export default interface IGetFollowersUseCase {
  execute(userId: string): Promise<Follow[] | null>;
}
