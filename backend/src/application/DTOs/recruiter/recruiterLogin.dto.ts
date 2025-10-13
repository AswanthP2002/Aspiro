export default interface RecruiterLoginDTO {
  email: string;
  password: string;
}

//{token, refreshToken, recruiter:{id:recruiter._id, email:recruiter.email}}

export interface RecruiterLoginResDTO {
  token: string;
  refreshToken: string;
  user: {
    id?: string;
    email: string;
  };
  role: string;
}
