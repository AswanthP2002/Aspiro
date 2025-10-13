import bcrypt from 'bcrypt';

const hashPassword = async (
  password: string,
  saltRound: number = 10
): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, saltRound);
  return hashedPassword;
};

export default hashPassword;
