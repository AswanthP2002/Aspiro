import { inject, injectable } from 'tsyringe';
import { IGetSimilarUserUsecase } from '../../interfaces/usecases/user/IGetSimilarUsers.usecase';
import IUserRepository from '../../../domain/interfaces/IUserRepo';
import SimilarUserSuggesionDTO from '../../DTOs/user/similarUserSuggesion.dto';
import ISkillRepo from '../../../domain/interfaces/user/ISkillRepo';
import Skills from '../../../domain/entities/skill.user/skills.entity';
import { SimilarSkillUserDTO } from '../../DTOs/user/user.dto.FIX';
import UserMapper from '../../mappers/user/User.mapperClass';
import User from '../../../domain/entities/user/User.FIX';
import IEducationRepo from '../../../domain/interfaces/user/IEducationRepo';
import Education from '../../../domain/entities/education/educations.entity';
import IExperienceRepo from '../../../domain/interfaces/user/IExperienceRepo';
import Experience from '../../../domain/entities/experience/experience.entity';

@injectable()
export default class GetSimlarUsersSuggesionUsecase implements IGetSimilarUserUsecase {
  constructor(
    @inject('IUserRepository') private _repo: IUserRepository,
    @inject('ISkillRepository') private _skillRepo: ISkillRepo,
    @inject('IEducationRepository') private _educationRepo: IEducationRepo,
    @inject('IExperienceRepository') private _experienceRepo: IExperienceRepo,
    @inject('UserMapper') private _mapper: UserMapper
  ) {}

  async execute(dto: SimilarUserSuggesionDTO): Promise<SimilarSkillUserDTO[] | null> {
    const { logedUserId } = dto;
    const getUserSkills = await this._skillRepo.findWithUserId(logedUserId);
    const getUserEducations = await this._educationRepo.findWithUserId(logedUserId);
    const getUserExperience = await this._experienceRepo.findWihUserId(logedUserId);
    const getUserDetails = await this._repo.findById(logedUserId);
    // console.log('-- checking users fetched skills --', getUserSkills);
    const similarSkills: string[] = [];
    const similarEducations: string[] = [];
    const similarStudiedInstitutions: string[] = [];
    const similarJobRoleWorked: string[] = [];
    const similarCompanyWorked: string[] = [];
    let similarheadline: string[] = [];
    const similarCity: string[] = [];
    const similarDistrict: string[] = [];
    const similarState: string[] = [];
    const similarCountry: string[] = [];
    const similarPincode: string[] = [];

    if (getUserSkills) {
      getUserSkills.forEach((skill: Skills) => {
        similarSkills.push(skill.skill);
      });
    }

    if (getUserEducations) {
      getUserEducations.forEach((education: Education) => {
        similarEducations.push(education.educationStream);
        similarStudiedInstitutions.push(education.institution);
      });
    }

    if (getUserExperience) {
      getUserExperience.forEach((experience: Experience) => {
        similarJobRoleWorked.push(experience.jobRole);
        similarCompanyWorked.push(experience.organization);
      });
    }

    if (getUserDetails) {
      similarheadline = getUserDetails.headline ? getUserDetails.headline.split(' ') : [];
    }

    const similarUsers = await this._repo.getSimilarUsersWithSkills(
      similarSkills,
      logedUserId,
      similarEducations,
      similarStudiedInstitutions,
      similarJobRoleWorked,
      similarCompanyWorked,
      similarheadline,
      similarCity,
      similarDistrict,
      similarState,
      similarCountry,
      similarPincode
    );

    if (similarUsers) {
      const dto: SimilarSkillUserDTO[] = [];
      similarUsers.forEach((user: User) => dto.push(this._mapper.UserToSimilarUserDTO(user)));

      return dto;
    }
    //stopped at geting simlar educations

    return null;
  }
}
