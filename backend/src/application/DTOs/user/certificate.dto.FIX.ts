
export default interface CertificateDTO {
  _id?: string;
  userId?: string;
  name?: string;
  issuedOrganization: string;
  issuedDate?: string;
  certificateUrl?: string;
  certificatePublicId?: string;
  createdAt?: string;
}

export interface CreateCertificateDTO {
  userId: string;
  issuedOrganization: string;
  issuedDate: string;
  name: string;
  file: any;
  path: any;
}

export interface DeleteCertificateDTO {
  certificateId: string;
  cloudinaryPublicId: string;
}
