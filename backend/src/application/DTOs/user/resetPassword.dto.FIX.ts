import z from 'zod';

export const ResetPasswordSchema = z.object({
  token: z.string(),
  password: z.string(),
});

export type ResetPasswordDTO = z.infer<typeof ResetPasswordSchema>;

export interface ResetPasswordDto {
  token: string;
  password: string;
}
