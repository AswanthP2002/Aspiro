import ManageRecruiterPermssionsDTO from '../../../DTOs/recruiter/manageRecruiterPermissions.dto';
import { RecruiterDTO } from '../../../DTOs/recruiter/recruiter.dto.FIX';

export default interface IManageRecruiterPermissionsUsecase {
  execute(dto: ManageRecruiterPermssionsDTO): Promise<RecruiterDTO | null>;
}
