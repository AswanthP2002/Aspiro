import SocialLinks from '../../../../domain/entities/socialLinks.entity';

export default interface IGetSocialLinksUseCase {
  execute(candidateId: string): Promise<SocialLinks[] | null>;
}
