export default interface RejectRecruiterApplicationDTO {
  applicationId: string;
  reason: string;
  feedback?: string;
}
