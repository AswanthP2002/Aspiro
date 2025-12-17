import SocialLinks from '../../../../domain/entities/SocialLinks';

export default interface IGetSocialLinksUseCase {
  execute(candidateId: string): Promise<SocialLinks[] | null>;
}
