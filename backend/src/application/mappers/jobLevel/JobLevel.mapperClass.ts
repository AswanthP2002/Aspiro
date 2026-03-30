import JobLevel from '../../../domain/entities/jobLevel/jobLevel.entity';
import JobLevelDTO, { CreateJobLevelDTO } from '../../DTOs/job.level.admin/jobLevel.dto';

export default class JobLevelMapper {
  public dtoToEntity(dto: CreateJobLevelDTO): JobLevel {
    return {
      name: dto.name,
      isActive: dto.isActive,
      slug: dto.name.toLowerCase(),
    };
  }

  public EntityToDTO(data: JobLevel): JobLevelDTO {
    return {
      _id: data._id,
      name: data.name,
      slug: data.slug,
      isActive: data.isActive,
      createdAt: data.createdAt,
    };
  }
}
