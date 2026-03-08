export default interface RecruiterLoginDTO {
  email: string;
  password: string;
}

export interface RecruiterLoginResDTO {
  token: string;
  refreshToken: string;
  user: {
    id?: string;
    email: string;
  };
  role: string;
}
