import { Exclude, Expose } from 'class-transformer';
import { IsDefined, IsOptional, IsString } from 'class-validator';

@Exclude()
export default class CertificateDTO {
  @Expose()
  _id!: string;

  @Expose()
  candidateId!: string;

  @Expose()
  issuedOrganization!: string;

  @Expose()
  issuedDate!: string;

  certificateId!: string;

  @Expose()
  certificateUrl!: string;

  @Expose()
  certificatePublicId?: string;

  @Expose()
  createdAt?: Date;
}

export class CreateCertificateDTO {
  @IsDefined()
  @IsString()
  candidateId!: string;

  @IsDefined()
  @IsString()
  issuedOrganization!: string;

  @IsDefined()
  @IsString()
  issuedDate!: string;

  @IsOptional()
  @IsString()
  certificateId!: string;

  @IsDefined()
  file: any;

  @IsDefined()
  path: any;
}
