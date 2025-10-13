import RecruiterLoginDTO, {
  RecruiterLoginResDTO,
} from '../../../DTOs/recruiter/recruiterLogin.dto';

export default interface ILoginRecruiterrUseCase {
  execute(
    loginRecruiterDto: RecruiterLoginDTO
  ): Promise<RecruiterLoginResDTO | null>;
}
