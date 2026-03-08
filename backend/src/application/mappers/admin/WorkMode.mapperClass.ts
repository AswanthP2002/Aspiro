import WorkMode from '../../../domain/entities/admin/workMode.entity';
import WorkModeDTO from '../../DTOs/admin/workMode.dto';

export default class WorkModeMapper {
  public entityToDTO(data: WorkMode): WorkModeDTO {
    return {
      _id: data._id,
      name: data.name,
      slug: data.slug,
      isActive: data.isActive as boolean,
      createdAt: data.createdAt,
    };
  }
}
