export default interface CreateRecruiterRequestDto {
  userId: string;
  employerType?: string;
  organizationDetails?: {
    organizationName?: string;
    organizationType?: string;
    industry?: string;
    organizationContactNumber?: string;
    organizationEmail?: string;
    teamStrength?: string;
    aboutCompany?: string;
    vision?: string;
    website?: string;
  };
}
