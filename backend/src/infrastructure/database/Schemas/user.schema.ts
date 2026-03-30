import { Schema } from 'mongoose';
import User, { AccountAction } from '../../../domain/entities/user/User.FIX';
import SocialLinks from '../../../domain/entities/user/SocialLinks';

export const SocialLinksSchema = new Schema<SocialLinks>({
  domain: { type: String },
  url: { type: String },
});

export const AccountActionSchema = new Schema<AccountAction>(
  {
    action: { type: String },
    actor: { type: String },
    date: { type: Date },
  },
  { timestamps: true }
);

export const UserSchema = new Schema<User>(
  {
    coverPhoto: {
      cloudinaryPublicId: { type: String },
      cloudinarySecureUrl: { type: String },
    },
    dateOfBirth: { type: Date },
    email: { type: String, required: true },
    facebookId: { type: String },
    googleId: { type: String },
    linkedinId: { type: String },
    headline: { type: String },
    isAdmin: { type: Boolean, default: false },
    isRecruiter: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    gender: { type: String, enum: ['Male', 'Female'] },
    name: { type: String, required: true },
    password: { type: String },
    location: {
      city: { type: String },
      district: { type: String },
      state: { type: String },
      country: { type: String },
      pincode: { type: String },
      coords: {
        type: { type: String, enum: ['Point'], required: false },
        coordinates: { type: [Number], required: false },
      },
    },
    connections: { type: [Schema.Types.ObjectId], ref: 'users' },
    phone: { type: String },
    profilePicture: {
      cloudinaryPublicId: { type: String },
      cloudinarySecureUrl: { type: String },
    },
    role: { type: [String], enum: ['user', 'recruiter', 'admin'], default: ['user'] },
    socialLinks: { type: [SocialLinksSchema] },
    summary: { type: String },
    verificationToken: { type: String },
    accountActions: { type: [AccountActionSchema] },
    otpExpiresAt: { type: Date },
    isBanned: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    lastLogin: { type: Date },
    hiddenPosts: { type: [Schema.Types.ObjectId], ref: 'posts' },
  },
  { timestamps: true }
);

UserSchema.index({ 'location.coords': '2dsphere' });
