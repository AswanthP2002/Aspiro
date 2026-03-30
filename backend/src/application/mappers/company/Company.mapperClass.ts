import Company from '../../../domain/entities/company/company.entity';
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
}
