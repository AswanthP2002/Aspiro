import RecommendedJobDTO from '../../../DTOs/job/recommendedJob.dto';

export default interface IGetRecommendedJobsUsecase {
  execute(logedUserId: string): Promise<RecommendedJobDTO[] | null>;
}
