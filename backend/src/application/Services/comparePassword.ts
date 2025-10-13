import bcrypt from 'bcrypt';

const comparePassword = async (password: string, hashedPassword: string) => {
  const result = await bcrypt.compare(password, hashedPassword);
  return result;
};


export default comparePassword