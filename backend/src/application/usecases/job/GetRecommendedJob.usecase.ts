import { inject, injectable } from 'tsyringe';
import IGetRecommendedJobsUsecase from '../../interfaces/usecases/job/IGetRecommendedJobs.usecase';
import IJobRepo from '../../../domain/interfaces/IJobRepo';
import RecommendedJobDTO from '../../DTOs/job/recommendedJob.dto';
import IUserRepository from '../../../domain/interfaces/IUserRepo';
import ISkillRepo from '../../../domain/interfaces/user/ISkillRepo';
import IExperienceRepo from '../../../domain/interfaces/user/IExperienceRepo';
import IEducationRepo from '../../../domain/interfaces/user/IEducationRepo';
import Skills from '../../../domain/entities/skill.user/skills.entity';
import Experience from '../../../domain/entities/experience/experience.entity';
import Education from '../../../domain/entities/education/educations.entity';
import JobMapper from '../../mappers/job/Job.mapperClass';
import JobAggregated from '../../../domain/entities/job/jobAggregated.entity';

@injectable()
export default class RecommendedJobUsecase implements IGetRecommendedJobsUsecase {
  constructor(
    @inject('IJobRepository') private _jobRepo: IJobRepo,
    @inject('IUserRepository') private _userRepo: IUserRepository,
    @inject('ISkillRepository') private _skillRepo: ISkillRepo,
    @inject('IExperienceRepository') private _experienceRepo: IExperienceRepo,
    @inject('IEducationRepository') private _educationRepo: IEducationRepo,
    @inject('JobMapper') private _mapper: JobMapper
  ) {}

  async execute(logedUserId: string): Promise<RecommendedJobDTO[] | null> {
    const logedUserDetails = await this._userRepo.findById(logedUserId);
    const userSkills = await this._skillRepo.findWithUserId(logedUserId);
    const userExperience = await this._experienceRepo.findWihUserId(logedUserId);
    const userEducations = await this._educationRepo.findWithUserId(logedUserId);

    let query = '';

    if (logedUserDetails && logedUserDetails) {
      query += `${logedUserDetails.headline?.trim()} `;
    }

    if (userSkills) {
      userSkills.forEach((skill: Skills) => {
        query += `${skill.skill.trim()} `;
      });
    }

    if (userExperience) {
      userExperience.forEach((experience: Experience) => {
        query += `${experience.jobRole.trim()} `;
      });
    }

    if (userEducations) {
      userEducations.forEach((education: Education) => {
        query += `${education.educationStream.trim()} `;
      });
    }

    if (logedUserDetails && logedUserDetails.summary) {
      query += `${logedUserDetails.summary.trim()}`;
    }

    const recommendedJobs = await this._jobRepo.getRecommendedJobs(query);
    console.log('-- checking returing suggested users --', recommendedJobs);
    if (recommendedJobs) {
      const dto: RecommendedJobDTO[] = [];
      recommendedJobs.forEach((data: JobAggregated) => {
        dto.push(this._mapper.JobDetailsToRecommendedJobDTO(data));
      });

      return dto;
    }

    return null;
  }
}
