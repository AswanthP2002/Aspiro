import IJobApplicationRepo from '../../../domain/interfaces/IJobApplicationRepo';
import IGetJobApplicationsUseCase from '../../interfaces/usecases/jobApplication/IGetJobApplications.usecase';
import { inject, injectable } from 'tsyringe';
import JobApplicationsListForRecruiterDTO, {
  JobApplicationListRecruiterRequestDTO,
} from '../../DTOs/jobApplication/JobApplicationsListForRecruiter.dto';
import JobApplicationMapper from '../../mappers/jobApplication/JobApplication.mapperClass';
import ApplicationsAggregated from '../../../domain/entities/jobApplication/jobApplicationsAggregated.entity';
import Experience from '../../../domain/entities/experience/experience.entity';
import Education from '../../../domain/entities/education/educations.entity';
import Fuse from 'fuse.js';

@injectable()
export default class GetJobApplicationsUseCase implements IGetJobApplicationsUseCase {
  constructor(
    @inject('IJobApplicationRepository') private _iJobApplicationRepo: IJobApplicationRepo,
    @inject('JobApplicationMapper') private _mapper: JobApplicationMapper
  ) {}

  private skillMatchingScore(
    candidateSkills: string[],
    jobRequiredSkills: string[],
    jobOptionalSkills: string[]
  ): number {
    const requiredSkillsMatched: { skill: string }[] = [];
    let optionalSkillsMatched = 0;

    jobRequiredSkills.forEach((skill: string) => {
      for (let i = 0; i < candidateSkills.length; i++) {
        if (skill.toLowerCase() === candidateSkills[i].toLowerCase()) {
          requiredSkillsMatched.push({ skill: skill });
        }
      }
    });

    jobOptionalSkills.forEach((skill: string) => {
      for (let i = 0; i < candidateSkills.length; i++) {
        if (skill.toLowerCase() === candidateSkills[i].toLowerCase()) {
          optionalSkillsMatched++;
        }
      }
    });

    // console.log('Required skill matched --- ', requiredSkillsMatched);
    // console.log('Optional skill matched --- ', optionalSkillsMatched);

    const totalRequiredSkills = jobRequiredSkills.length;
    console.log('Total required skills -- ', totalRequiredSkills);
    const totalRequiredSkillsMatched = requiredSkillsMatched.length;
    console.log('Total required skills matched -- ', totalRequiredSkillsMatched);
    const requiredSkillsMatchPercentage = (totalRequiredSkillsMatched * 100) / totalRequiredSkills; //60
    console.log('Required skill matched percentage -- ', requiredSkillsMatchPercentage);

    const totalOptionalSkills = jobOptionalSkills.length;
    console.log('Total optional skills -- ', totalOptionalSkills);
    const totalOptionalSkillsMatched = optionalSkillsMatched;
    console.log('Total Optional skills matched -- ', totalOptionalSkillsMatched);
    const optionalSkillsMatchedPercentage =
      totalOptionalSkills === 0 ? 0 : (totalOptionalSkillsMatched * 100) / totalOptionalSkills;

    console.log('Optional skill matched percentage --', optionalSkillsMatchedPercentage);

    return requiredSkillsMatchPercentage * 0.8 + optionalSkillsMatchedPercentage * 0.2;
  }

  private experienceMatchingScore(
    candidateExp: Experience[],
    jobExperienceInYears: number
  ): number {
    let expInTotalMonths = 0;
    for (let i = 0; i < candidateExp.length; i++) {
      const experience = candidateExp[i];
      const starting = new Date(experience.startDate as string);
      const ending = experience.isPresent ? new Date() : new Date(experience.endDate as string);
      const monthDif =
        (ending.getFullYear() - starting.getFullYear()) * 12 +
        ending.getMonth() -
        starting.getMonth();

      expInTotalMonths += monthDif;
    }

    const expInYears = Math.floor(expInTotalMonths / 12);
    if (expInYears >= jobExperienceInYears) {
      return 100;
    } else {
      return (expInYears * 100) / jobExperienceInYears;
    }
  }

  private educationMatchingScore(
    candidateEducations: Education[],
    jobRequiredEducation: string
  ): number {
    const fuse = new Fuse(candidateEducations, {
      keys: ['educationStream'],
      useExtendedSearch: true,
      threshold: 2,
    });

    const searchResult = fuse.search(jobRequiredEducation);
    let score = 0;
    searchResult.forEach((result) => {
      score += result.score ? result.score : 0;
    });

    return score;
  }

  private matchScore(application: ApplicationsAggregated): number {
    //candidate side
    const skills = application.skills;
    const experiences = application.experiences;
    const educations = application.educations;
    const candidateHeadline = application.applicant.headline;
    const candidateDescription = application.applicant.summary;
    //resume matching also should done for more accuracy

    //job side
    const jobRequiredSkills = application.job.requiredSkills;
    const jobOptionalSkills = application.job.optionalSkills;
    const jobDetails = [
      ...application.job.description.split(' '),
      ...application.job.requirements.split(' '),
      ...application.job.responsibilities.split(' '),
    ];

    const skillMatchingScore = this.skillMatchingScore(
      skills.map((s) => s.skill),
      jobRequiredSkills,
      jobOptionalSkills
    );

    const experienceMatchingScre = this.experienceMatchingScore(
      experiences,
      application.job.experienceInYears
    );

    const educationMatchingScore = this.educationMatchingScore(
      educations,
      application.job.qualification
    );
    console.log('Skill match score -- ', skillMatchingScore);
    console.log('Experience match score -- ', experienceMatchingScre);
    const totalMatchScore = ((skillMatchingScore + experienceMatchingScre) * 100) / 200;
    console.log('total matching score -- ', totalMatchScore);

    return totalMatchScore;
  }

  async execute(dto: JobApplicationListRecruiterRequestDTO): Promise<{
    applications: JobApplicationsListForRecruiterDTO[];
    totalPages: number;
    totalDocs: number;
    applied?: number;
    screening?: number;
    interview?: number;
    offer?: number;
    hired?: number;
    rejected?: number;
  } | null> {
    const { search, page, limit, filter, jobId } = dto;
    let statusFilter = ['applied', 'screening', 'interview', 'offer', 'hired', 'rejected'];
    switch (filter) {
      case 'applied':
        statusFilter = ['applied'];
        break;
      case 'screening':
        statusFilter = ['screening'];
        break;
      case 'interview':
        statusFilter = ['interview'];
        break;
      case 'offer':
        statusFilter = ['offer'];
        break;
      case 'hired':
        statusFilter = ['hired'];
        break;
      case 'rejected':
        statusFilter = ['rejected'];
        break;
      default:
        statusFilter = ['applied', 'screening', 'interview', 'offer', 'hired', 'rejected'];
    }
    const result = await this._iJobApplicationRepo.getApplicationsByJobId(
      jobId,
      search,
      page,
      limit,
      statusFilter
    );
    if (result) {
      const dto: JobApplicationsListForRecruiterDTO[] = [];
      result.applications.forEach((data) => {
        const matchScore = this.matchScore(data);
        dto.push(
          this._mapper.jobApplicationAggregatedToJobApplicationListForRecruiterDTO({
            ...data,
            matchScore,
          })
        );
      });

      return {
        applications: dto,
        totalDocs: result.totalDocs,
        totalPages: result.totalPages,
        applied: result.applied,
        screening: result.screening,
        interview: result.interview,
        offer: result.offer,
        hired: result.hired,
        rejected: result.rejected,
      };
    }
    return null;
  }
}
