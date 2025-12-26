import { IsDefined, IsString, MinLength } from 'class-validator';
import z from 'zod';

export const ResetPasswordSchema = z.object({
  token: z.string(),
  password: z.string(),
});

export type ResetPasswordDTO = z.infer<typeof ResetPasswordSchema>;

export class ResetPasswordDto {
  @IsDefined()
  @IsString()
  token!: string;

  @IsDefined()
  @IsString()
  @MinLength(8)
  password!: string;
}
