export default interface Resume {
  _id?: string;
  userId?: string;
  name?: string;
  resumeUrlCoudinary: string;
  resumePublicIdCloudinary: string;
  isPrimary?: boolean;
  createdAt?: Date;
}
