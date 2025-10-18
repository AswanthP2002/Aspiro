import User from '../../../domain/entities/shared/User';
import UpdateUserDTO from '../../DTOs/user/updateUser.dto';

export default function mapUpdateUserDtoToUser(updateUserDto: UpdateUserDTO): User {
  return {
    _id: updateUserDto._id,
    coverPhoto: updateUserDto.coverPhoto,
    profilePicture: updateUserDto.profilePicture,
    email: updateUserDto.email,
    createdAt: updateUserDto.createdAt,
    facebookId: updateUserDto.facebookId,
    googleId: updateUserDto.googleId,
    linkedinId: updateUserDto.linkedinId,
    isAdmin: updateUserDto.isAdmin,
    isBlocked: updateUserDto.isBlocked,
    isVerified: updateUserDto.isVerified,
    otpExpiresAt: updateUserDto.otpExpiresAt,
    password: updateUserDto.password,
    phone: updateUserDto.phone,
    role: updateUserDto.role,
    updatedAt: updateUserDto.updatedAt,
    verificationToken: updateUserDto.verificationToken,
  };
}
