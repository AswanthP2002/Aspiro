import { NewRecruiter } from '../../../domain/entities/recruiter/recruiter.entity';
import RecruiterProfileOverviewData from '../../../domain/entities/recruiter/recruiterProfilveOverviewData';
import CreateRecruiterDTO, { RecruiterDTO } from '../../DTOs/recruiter/recruiter.dto.FIX';
import RecruiterProfilelOverviewDataDTO, {
  AdminRecruiterApplicationsDTO,
  AdminRecruiterDetailsDTO,
  AdminRecruiterListDTO,
} from '../../DTOs/recruiter/recruiterProfileOverviewData.dto.FIX';

export default class RecruiterMapper {
  public createRecruiterDtoToRecruiter(dto: CreateRecruiterDTO): NewRecruiter {
    return {
      companyId: dto.companyId,
      fullName: dto.fullName,
      email: dto.email,
      phone: dto.phone,
      recruiterType: dto.recruiterType,
      linkedinUrl: dto.linkedinUrl,
      professionalTitle: dto.profiessionalTitle,
      yearOfExperience: dto.yearOfExperience,
      userId: dto.userId,
    };
  }

  public profileOverviewDataToDTO(
    data: RecruiterProfileOverviewData
  ): RecruiterProfilelOverviewDataDTO {
    return {
      _id: data._id as string,
      userId: data.userId as string,
      recruiterType: data.recruiterType,
      jobs: data.jobs,
      userProfile: data.userProfile,
      profileStatus: data.profileStatus,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      applicationResendBufferDate: data.applicationResendBufferDate,
      companyId: data.companyId,
      email: data.email,
      fullName: data.fullName,
      isJobsHidden: data.isJobsHidden,
      isPermissionRevoked: data.isPermissionRevoked,
      isRejected: data.isRejected,
      isVerified: data.isVerified,
      linkedinUrl: data.linkedinUrl,
      phone: data.phone,
      rejection: data.rejection,
      profiessionalTitle: data.professionalTitle,
      verificationDocument: data.verificationDocument,
      yearOfExperience: data.yearOfExperience,
      companyDetails: data.companyDetails,
      verificationTimeline: data.verificationTimeline,
    };
  }

  public recruiterToRecruiterDTO(recruiter: NewRecruiter): RecruiterDTO {
    return {
      _id: recruiter._id,
      applicationResendBufferDate: recruiter.applicationResendBufferDate,
      companyId: recruiter.companyId,
      email: recruiter.email,
      phone: recruiter.phone,
      fullName: recruiter.fullName,
      isJobsHidden: recruiter.isJobsHidden,
      createdAt: recruiter.createdAt,
      isPermissionRevoked: recruiter.isPermissionRevoked,
      isRejected: recruiter.isRejected,
      isVerified: recruiter.isVerified,
      linkedinUrl: recruiter.linkedinUrl,
      profiessionalTitle: recruiter.professionalTitle,
      profileStatus: recruiter.profileStatus,
      recruiterType: recruiter.recruiterType,
      updatedAt: recruiter.updatedAt,
      userId: recruiter.userId,
      verificationTimeline: recruiter.verificationTimeline,
      verificationDocument: recruiter.verificationDocument,
      yearOfExperience: recruiter.yearOfExperience,
    };
  }

  public recruiterProfileOverviewToAdminRecruiterApplicationsDTO(
    data: RecruiterProfileOverviewData
  ): AdminRecruiterApplicationsDTO {
    return {
      _id: data._id as string,
      fullName: data.fullName,
      email: data.email,
      profileStatus: data.profileStatus,
      phone: data.phone,
      professionalTitle: data.professionalTitle,
      companyDetails: data.companyDetails,
      createdAt: data.createdAt,
      linkedinUrl: data.linkedinUrl,
      verificationDocument: data.verificationDocument,
      recruiterType: data.recruiterType,
      yearOfExperience: data.yearOfExperience,
    };
  }

  public recruiterProfileOverviewToAdminRecruiterListDTO(
    data: RecruiterProfileOverviewData
  ): AdminRecruiterListDTO {
    return {
      _id: data._id,
      fullName: data.fullName,
      email: data.email,
      recruiterType: data.recruiterType,
      companyName: data.companyDetails?.name,
      isVerified: data.isVerified,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  public recruiterProfileOverviewToAdminRecruiterDetailsDTO(
    data: RecruiterProfileOverviewData
  ): AdminRecruiterDetailsDTO {
    return {
      _id: data._id,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      isVerified: data.isVerified,
      recruiterType: data.recruiterType,
      companyDetails: data.companyDetails,
      isPermissionRevoked: data.isPermissionRevoked,
      totalJobs: 0,
      totalApplications: 0,
      activeJobs: 0,
      linkedinUrl: data.linkedinUrl,
      profiessionalTitle: data.professionalTitle,
      verificationDocument: data.verificationDocument,
      verificationTimeline: data.verificationTimeline,
      yearOfExperience: data.yearOfExperience,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}
