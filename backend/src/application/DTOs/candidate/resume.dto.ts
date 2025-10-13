export default interface ResumeDTO {
  _id?: string;
  candidateId?: string;
  resumeFileName?: string;
  resumeUrlCoudinary: string;
  resumePublicIdCloudinary: string;
  createdAt?: Date;
}

export interface CreateResumeDTO {
  candidateId?: string;
  file: any;
  path: string;
}

export interface DeleteResumeDTO {
  resumeId: string;
  cloudinaryPublicId: string;
}
