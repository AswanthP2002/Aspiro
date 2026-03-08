export interface AdminUserPasswordResetDTO {
  adminId: string;
  userId: string;
  userEmail: string;
  code: string;
  token: string;
}
