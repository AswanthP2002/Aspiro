import mongoose from 'mongoose';
import {
  InterviewAIEntity,
  InterviewDashboardEntity,
} from '../../../domain/entities/interview/interview.ai.entity';
import IInterviewAiResultRepo from '../../../domain/entities/interview/interview.ai.result.repo';
import { InterviewAIResultModel } from '../../database/Schemas/user/interview.ai.result.schema';
import BaseRepository from '../baseRepository';

export default class InterviewAIResultRepository
  extends BaseRepository<InterviewAIEntity>
  implements IInterviewAiResultRepo
{
  constructor() {
    super(InterviewAIResultModel);
  }

  async getUserInterviewDashboard(userId: string): Promise<InterviewDashboardEntity | null> {
    if (!mongoose.isValidObjectId(userId)) return null;

    const result = await InterviewAIResultModel.find({
      userId: new mongoose.Types.ObjectId(userId),
    }).sort({ createdAt: 1 });

    if (result.length === 0) return null;

    console.log('-- checking find result: dashboard --', result);
    const averageScore = result.reduce((acc, doc) => acc + doc.overallScore, 0) / result.length;
    const totalInterviews = result.length;
    const performance: { attempt: number; score: number }[] = [];
    const history: { title: string; score: number; createdAt: string }[] = [];
    let streak = 0;

    for (let i = 0; i < result.length; i++) {
      performance.push({ attempt: i + 1, score: result[i].overallScore });
      history.push({
        title: 'AI Interview',
        score: result[i].overallScore,
        createdAt: result[i].createdAt as string,
      });
    }

    //having problem with streak calculating logic, can not check properties of items does not exist
    for (let i = 0; i < result.length; i++) {
      if (result.length === 1) {
        streak = 1;
        break;
      } else {
        const practiceDate = new Date(result[i].createdAt as string);
        streak++;
        if (
          i !== 0 &&
          new Date(result[i - 1].createdAt as string).getDate() !== practiceDate.getDate() - 1
        ) {
          break;
        }
      }
    }

    const firstInterview = new Date(result[0].startAt as string).getTime();
    const lastInterview = new Date(result[result.length - 1].endAt as string).getTime();

    const difference = lastInterview - firstInterview;
    const totalHours = Math.floor(difference / (1000 * 60 * 60));
    const totalMinutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const totalPracticeTime = `${totalHours}h ${totalMinutes}m`;

    return {
      totalInterviews,
      averageScore,
      history,
      performance,
      totalPracticeTime,
      streak,
    };
  }
}
