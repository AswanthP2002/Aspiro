//candidateId: string, domain: string, url: string

import { IsDefined, IsString } from 'class-validator';

export default class AddSocialLinkDTO {
  @IsDefined()
  @IsString()
  userId!: string;

  @IsDefined()
  @IsString()
  domain!: string;

  @IsDefined()
  @IsString()
  url!: string;
}

export class RemoveSocialLinkDTO {
  @IsDefined()
  @IsString()
  userId?: string;

  @IsDefined()
  @IsString()
  domain!: string;
}
