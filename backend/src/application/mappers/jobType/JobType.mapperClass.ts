import JobType from '../../../domain/entities/jobType/jobType.entity';
import JobTypeDTO, { CreateJobTypeDTO } from '../../DTOs/jobType.admin/jobType.dto';

export default class JobTypeMapper {
  public DtoToEntity(dto: CreateJobTypeDTO): JobType {
    return {
      name: dto.name,
      slug: dto.name?.toLowerCase(),
      isActive: dto.isActive,
    };
  }

  public EntityToDto(data: JobType): JobTypeDTO {
    return {
      _id: data._id,
      name: data.name,
      slug: data.slug,
      isActive: data.isActive,
      createdAt: data.createdAt,
    };
  }
}
