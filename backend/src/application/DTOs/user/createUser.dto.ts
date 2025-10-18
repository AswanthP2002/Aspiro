
export type Role = 'candidate' | 'recruiter' | 'admin';

export default interface CreateUserDTO {
    name?: string;
    password?: string;
    role?: Role[];
    phone?: string;
    email?: string;
    googleId?: string;
    facebookId?: string;
    linkedinId?: string;
}