export default interface Certificates {
  _id?: string;
  userId?: string;
  name?: string;
  issuedOrganization: string;
  issuedDate?: string;
  certificateUrl?: string;
  certificatePublicId?: string;
  createdAt?: string;
}
