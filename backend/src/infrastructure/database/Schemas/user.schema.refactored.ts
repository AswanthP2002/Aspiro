import { Schema } from 'mongoose';
import User from '../../../domain/entities/shared/User.entitty';

export const UserSchema = new Schema<User>(
  {
    role: { type: String, enum: ['candidate', 'recruiter', 'admin'] },
    email: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    coverPhoto: {
      cloudinaryPublicId: { type: String },
      cloudinarySecureUrl: { type: String },
    },
    profilePicture: {
      cloudinaryPublicId: { type: String },
      cloudinarySecureUrl: { type: String },
    },
    facebookid: { type: String },
    googleid: { type: String },
    password: { type: String },
    phone: { type: String },
    otpExpiresAt: { type: Date },
    verificationToken: { type: String },
  },
  { timestamps: true }
);
