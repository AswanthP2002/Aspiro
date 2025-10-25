import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import ICandidateRepo from '../../../domain/interfaces/candidate/ICandidateRepo';
import BaseRepository from '../baseRepository';
import SocialLinks from '../../../domain/entities/SocialLinks';
import { CandidateDAO } from '../../database/DAOs/user/candidateDAO';
import CandidateAggregated from '../../../domain/entities/user/candidateAggregated.entity';
import CandidatePaginated from '../../../domain/entities/user/candidatePaginated.entity';
import Candidate from '../../../domain/entities/user/candidate.entity';
import { injectable } from 'tsyringe';
import { FindUsersQuery } from '../../../application/queries/users.query';

@injectable()
export default class CandidateRepository
  extends BaseRepository<Candidate>
  implements ICandidateRepo
{
  constructor() {
    super(CandidateDAO); //chance for runtime error while creating experience :::
  }

  // async create(candidate: Candidate): Promise<SaveCandidate | null> {
  //     const db = await connectDb()
  //     const result = await db.collection(this._collection).insertOne(candidate)
  //     console.log('Candidate repo.ts :: ', result)
  //     console.log('Candidate repo.ts :: ', typeof result.insertedId)
  //     return result
  // }

  async findByEmail(email?: string): Promise<Candidate | null> {
    const candidate = await CandidateDAO.findOne({ email: email });
    return candidate;
  }

  async findByUserId(userId?: string): Promise<Candidate | null> {
    const candidate = await CandidateDAO.findOne({
      userId: new mongoose.Types.ObjectId(userId),
    }).lean();
    return candidate;
  }

  async findByMobileNumber(mobileNumber?: string): Promise<Candidate | null> {
    return await CandidateDAO.findOne({ phone: mobileNumber });
  }

  async findByCandidateId(id: string): Promise<Candidate | null> {
    return await CandidateDAO.findOne({ _id: new mongoose.Types.ObjectId(id) });
  }

  async findByGoogleId(googleId: string): Promise<Candidate | null> {
    return await CandidateDAO.findOne({ googleid: googleId });
  }

  async findByToken(token: string): Promise<Candidate | null> {
    const candidate = await CandidateDAO.findOne({ verificationToken: token });
    return candidate;
  }

  async updateVerificationById(id: string): Promise<Candidate | null> {
    const updateData = await CandidateDAO.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: { isVerified: true } },
      { returnDocument: 'after' }
    );
    return updateData;
  }

  async updateIntroDetails(
    id: string,
    role: string,
    city: string,
    district: string,
    state: string,
    country: string,
    pincode: string,
    summary: string
  ): Promise<Candidate | null> {
    const result = await CandidateDAO.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      {
        $set: {
          role: role,
          'location.city': city,
          'location.district': district,
          'location.state': state,
          'location.country': country,
          'location.pincode': pincode,
          about: summary,
        },
      },
      { returnDocument: 'after' }
    );

    return result;
  }

  async editProfile(
    id: string,
    name: string,
    role: string,
    city: string,
    district: string,
    state: string,
    country: string,
    about: string
  ): Promise<Candidate | null> {
    const doc = await CandidateDAO.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          name: name,
          role: role,
          'location.city': city,
          'location.district': district,
          'location.state': state,
          'location.country': country,
          about: about,
        },
      },
      { returnDocument: 'after' }
    );

    return doc;
  }

  async findCandidates(
    query: FindUsersQuery
  ): Promise<CandidatePaginated | null> {
    const { filterOptions, limit, page, search, sortOption } = query;
    const skip = (page - 1) * limit;
    const currentSort = '';
    const matchFilter: any = { 'userDetails.isAdmin': false };
    const pipeLine: any = [
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
      { $unwind: '$userDetails' },
    ];

    if (search) {
      matchFilter.name = { $regex: new RegExp(search, 'i') };
    }

    // if (filterOptions.jobRole.length > 0) {
    //   matchFilter.jobTitle = { $in: filterOptions?.jobRole };
    // }

    console.log('testing candidate is blocked or not', filterOptions.status);

    if (filterOptions.status.length > 0) {
      matchFilter['userDetails.isBlocked'] = { $in: filterOptions?.status };
    }
    console.log('match filter before tryingh', matchFilter);

    pipeLine.push({ $match: matchFilter }); //match options
    pipeLine.push({ $sort: sortOption }); //sort option
    pipeLine.push({ $skip: skip }); //skip option
    pipeLine.push({ $limit: limit }); //limit option

    const candidates: any[] = await CandidateDAO.aggregate(pipeLine);

    const totalDocuments = candidates?.length || 0;
    const totalPages = Math.ceil(totalDocuments / limit);
    return { candidates, currentPage: page, totalPages, currentSort };
  }

  async blockCandidate(id: string): Promise<boolean> {
    const result = await CandidateDAO.updateOne(
      { _id: new ObjectId(id) },
      { $set: { isBlocked: true } }
    );

    return result.acknowledged;
  }

  async unblockCandidate(id: string): Promise<boolean> {
    const result = await CandidateDAO.updateOne(
      { _id: new ObjectId(id) },
      { $set: { isBlocked: false } }
    );

    return result.acknowledged;
  }

  // async isCandidateBlocked(id: string): Promise<boolean | undefined> {
  //   const result = await CandidateDAO.findOne({ _id: new ObjectId(id) });
  //   return result?.isBlocked;
  // }

  async candidateAggregatedData(
    candidateId: string
  ): Promise<CandidateAggregated | null> {
    const result = await CandidateDAO.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(candidateId) } },
      {
        $lookup: {
          from: 'users',
          foreignField: '_id',
          localField: 'userId',
          as: 'userDetails',
        },
      },
      { $unwind: '$userDetails' },
      {
        $lookup: {
          from: 'experiences',
          foreignField: 'candidateId',
          localField: '_id',
          as: 'experience',
        },
      },
      {
        $lookup: {
          from: 'skills',
          foreignField: 'candidateId',
          localField: '_id',
          as: 'skills',
        },
      },
      {
        $lookup: {
          from: 'educations',
          foreignField: 'candidateId',
          localField: '_id',
          as: 'education',
        },
      },
      {
        $lookup: {
          from: 'posts',
          foreignField: 'creatorId',
          localField: '_id',
          as: 'posts',
        },
      },
      {
        $lookup: {
          from: 'follows',
          foreignField: 'following',
          localField: '_id',
          as: 'followers',
        },
      },
      {
        $lookup: {
          from: 'follows',
          foreignField: 'follower',
          localField: '_id',
          as: 'following',
        },
      },
    ]);

    return result[0];
  }

  async addSocialLink(
    candidateId?: string,
    socialLink?: SocialLinks
  ): Promise<Candidate | null> {
    //find the domain is already exist or not
    const isExist = await CandidateDAO.findOne({
      _id: new mongoose.Types.ObjectId(candidateId),
      socialLinks: { $elemMatch: { domain: socialLink?.domain } },
    });
    if (isExist) return null;

    const updateResult = CandidateDAO.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(candidateId) },
      { $push: { socialLinks: socialLink } },
      { returnDocument: 'after' }
    );

    return updateResult;
  }

  async getSocialLinks(candidateId: string): Promise<any> {
    const result = await CandidateDAO.findOne({
      _id: new mongoose.Types.ObjectId(candidateId),
    });

    return result ? result.socialLinks : null;
  }

  async deleteSocialLink(candidateId?: string, domain?: string): Promise<void> {
    const result = await CandidateDAO.updateOne(
      { _id: new mongoose.Types.ObjectId(candidateId) },
      { $pull: { socialLinks: { domain: domain } } }
    );
  }

  async uploadProfilePhoto(
    candidateId: string,
    cloudinaryUrl: string,
    cloudinaryPublicId: string
  ): Promise<Candidate | null> {
    const result = await CandidateDAO.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(candidateId) },
      {
        $set: {
          profilePicture: {
            cloudinarySecureUrl: cloudinaryUrl,
            cloudinaryPublicId: cloudinaryPublicId,
          },
        },
      },
      { returnDocument: 'after' }
    );
    return result;
  }

  async removeProfilePhoto(candidateId: string): Promise<void> {
    await CandidateDAO.updateOne(
      { _id: new mongoose.Types.ObjectId(candidateId) },
      {
        $set: {
          profilePicture: { cloudinaryPublicId: '', cloudinarySecureUrl: '' },
        },
      }
    );
  }

  async uploadCoverPhoto(
    candidateId: string,
    cloudinaryUrl: string,
    cloudinaryPublicId: string
  ): Promise<Candidate | null> {
    const result = await CandidateDAO.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(candidateId) },
      {
        $set: {
          coverPhoto: {
            cloudinaryPublicId: cloudinaryPublicId,
            cloudinarySecureUrl: cloudinaryUrl,
          },
        },
      },
      { returnDocument: 'after' }
    );

    return result;
  }

  async removeCoverPhoto(candidateId: string): Promise<void> {
    await CandidateDAO.updateOne(
      { _id: new mongoose.Types.ObjectId(candidateId) },
      {
        $set: {
          coverPhoto: { cloudinaryPublicId: '', cloudinarySecureUrl: '' },
        },
      }
    );
  }
}
