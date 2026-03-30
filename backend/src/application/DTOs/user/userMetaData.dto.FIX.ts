import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserMetadataDto {
  @Expose()
  _id!: string;

  @Expose()
  name!: string;

  @Expose()
  headline!: string;

  @Expose()
  email!: string;

  @Expose()
  profilePicture!: {
    cloudinaryPublicId: string;
    cloudinarySecureUrl: string;
  };
}

//legacy
export default interface UserMetaDataDTO {
  _id?: string;
  name?: string;
  headline?: string;
  email?: string;
  role?: string;
  profilePicture?: string;
  subscription?: {
    subscriptionId: string;
    planId: string;
    name: string;
  };
}
