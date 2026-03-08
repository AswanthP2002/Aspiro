export default interface ResumeDTO {
  _id?: string;
  userId?: string;
  name?: string;
  resumeUrlCoudinary?: string;
  resumePublicIdCloudinary?: string;
  isPrimary?: boolean;
  createdAt?: Date;
}

export interface CreateResumeDTO {
  userId: string;
  file: any; //need to change file type later : NEED_FIX
  path: string;
  name: string;
  isPrimary: boolean;
}

export interface DeleteResumeDTO {
  resumeId: string;
  cloudinaryPublicId: string;
}

export interface SetResumePrimaryDTO {
  resumeId: string;
  userId: string;
}
