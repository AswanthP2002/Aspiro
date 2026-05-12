import Company, {
  CompanyWithRecruitersAndJobs,
} from '../../../domain/entities/company/company.entity';
import AdminCompanyDataDTO from '../../DTOs/company/adminCompanyData.dto';
import CompanyDTO, { AddCompanyDTO } from '../../DTOs/company/company.dto';

export default class CompanyMapper {
  public companyDtoToCompanyEntity(dto: AddCompanyDTO): Company {
    return {
      name: dto.name as string,
      slogan: dto.slogan,
      industry: dto.industry,
      linkedin: dto.linkedin,
      location: dto.location,
      description: dto.description,
      website: dto.website,
    };
  }

  public companyEntityToCompanyDTO(entity: Company): CompanyDTO {
    return {
      _id: entity._id,
      name: entity.name,
      slogan: entity.slogan,
      description: entity.description,
      linkedin: entity.linkedin,
      website: entity.website,
      industry: entity.industry,
      location: entity.location,
      logo: entity.logo,
      createdAt: entity.createdAt,
    };
  }

  public companyWithJobsAndRecruitersToCompanyDataForAdminDTO(
    data: CompanyWithRecruitersAndJobs
  ): AdminCompanyDataDTO {
    return {
      _id: data._id,
      name: data.name,
      description: data.description,
      slogan: data.slogan,
      industry: data.industry,
      website: data.website,
      linkedin: data.linkedin,
      location: data.location,
      jobs: data.jobs.length,
      recruiters: data.recruiters.length,
      createdAt: data.createdAt,
    };
  }
}
