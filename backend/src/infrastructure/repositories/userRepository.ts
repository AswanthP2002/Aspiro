import mongoose, { connection } from 'mongoose';
import User, { AccountAction } from '../../domain/entities/user/User.FIX';
import IUserRepository from '../../domain/interfaces/IUserRepo';
import { UserDAO } from '../database/DAOs/user.dao.refactored';
import BaseRepository from './baseRepository';
import { injectable } from 'tsyringe';
import { FindUsersQuery } from '../../application/queries/user/users.query';
import UserProfileAggregatedAdmin from '../../domain/entities/user/userProfileAggregated';
import LoadUsersForPublicDBQuery from '../../application/queries/user/loadUsersForPublicDB.query';
// import { redisClient } from '../redis/redisClient';
import UserCachedData from '../../domain/entities/user/user.cachedData.entity';
import MyProfileAggregated from '../../domain/entities/user/myProfileAggregated.entity';
import UserFullProfileData from '../../domain/entities/user/userFullProfile.entity';
import { ConnectionWithSenderDetails } from '../../domain/entities/connection/connectionRequest.entity';

@injectable()
export default class UserRepository extends BaseRepository<User> implements IUserRepository {
  constructor() {
    super(UserDAO);
  }

  async findByEmail(email?: string): Promise<User | null> {
    const result = await UserDAO.findOne({ email: email });
    return result;
  }

  async getUserAggregatedProfile(userId: string): Promise<UserProfileAggregatedAdmin | null> {
    if (!mongoose.isValidObjectId(userId)) return null;

    const result = await UserDAO.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: 'certificates',
          localField: '_id',
          foreignField: 'userId',
          as: 'certificates',
        },
      },
      {
        $lookup: {
          from: 'educations',
          localField: '_id',
          foreignField: 'userId',
          as: 'educations',
        },
      },
      {
        $lookup: {
          from: 'experiences',
          localField: '_id',
          foreignField: 'userId',
          as: 'experiences',
        },
      },
      {
        $lookup: {
          from: 'skills',
          localField: '_id',
          foreignField: 'userId',
          as: 'skills',
        },
      },
      {
        $lookup: {
          from: 'posts',
          localField: '_id',
          foreignField: 'creatorId',
          as: 'posts',
        },
      },
      {
        $lookup: {
          from: 'follows',
          localField: '_id',
          foreignField: 'following',
          as: 'followers',
        },
      },
      {
        $lookup: {
          from: 'follows',
          localField: '_id',
          foreignField: 'follower',
          as: 'following',
        },
      },
      {
        $lookup: {
          from: 'connectionrequests',
          localField: '_id',
          foreignField: 'receiver',
          as: 'connectionRequests',
        },
      },
      // {
      //   $lookup:{
      //     from:'recruiters',
      //     localField:'userId',
      //     foreignField:'_id',
      //     as:'recruiterProfile'
      //   }
      // },
      // {$unwind:'$recruiterProfile'},
      // {$lookup:{
      //   from:'jobs',
      //   localField:'recruiterId',
      //   foreignField:'_id',
      //   as:'jobs'
      // }}
    ]);

    return result[0];
  }

  async findByPhone(phone?: string): Promise<User | null> {
    const result = await UserDAO.findOne({ phone: phone });
    return result;
  }

  async updateVerify(id?: string): Promise<User | null> {
    const result = await UserDAO.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: { isVerified: true } },
      { returnDocument: 'after' }
    );

    return result;
  }

  async isUserBlocked(id?: string): Promise<boolean | null> {
    const user = await UserDAO.findOne({
      _id: new mongoose.Types.ObjectId(id),
    });
    return user?.isBlocked === true;
  }

  async blockUser(userId: string): Promise<boolean> {
    const result = await UserDAO.updateOne(
      { _id: new mongoose.Types.ObjectId(userId) },
      { $set: { isBlocked: true } }
    );
    return result.modifiedCount > 0;
  }

  async unblockUser(userId: string): Promise<boolean> {
    const result = await UserDAO.updateOne(
      { _id: new mongoose.Types.ObjectId(userId) },
      { $set: { isBlocked: false } }
    );

    return result.modifiedCount > 0;
  }

  async findUsersWithQuery(
    query: FindUsersQuery
  ): Promise<{ users: User[]; total: number } | null> {
    const { search, page, limit, filterOptions, sortOption } = query;
    const skip = (page - 1) * limit;

    const matchFilter: { [key: string]: object | boolean } = search
      ? { name: { $regex: new RegExp(search, 'i') } }
      : { isAdmin: false };

    if (filterOptions.status.length > 0) {
      matchFilter['isBlocked'] = { $in: filterOptions.status };
    }

    if (filterOptions.roles.length > 0) {
      matchFilter['role'] = { $in: filterOptions.roles };
    }

    if (filterOptions.verification.length > 0) {
      matchFilter['isVerified'] = { $in: filterOptions.verification };
    }

    const usersPipeline = [
      { $match: matchFilter },
      { $sort: sortOption },
      { $skip: skip },
      { $limit: limit },
    ];

    const totalCountPipeline = [{ $match: matchFilter }, { $count: 'total' }];

    const [users, totalResult] = await Promise.all([
      UserDAO.aggregate(usersPipeline),
      UserDAO.aggregate(totalCountPipeline),
    ]);

    const total = totalResult[0]?.total || 0;

    return { users, total };
  }

  async addSocialLink(
    userId: string,
    socialLink: { domain: string; url: string }
  ): Promise<User | null> {
    if (!mongoose.isValidObjectId(userId)) return null;

    const result = await UserDAO.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(userId) },
      { $push: { socialLinks: socialLink } },
      { returnDocument: 'after' }
    ).lean();

    return result as User | null;
  }

  async removeSocialLink(userId: string, domain: string): Promise<User | null> {
    if (!mongoose.isValidObjectId(userId)) return null;

    const result = await UserDAO.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(userId) },
      { $pull: { socialLinks: { domain: domain } } },
      { returnDocument: 'after' }
    ).lean();

    return result as User | null;
  }

  async loadUsersForPublic(
    query: LoadUsersForPublicDBQuery
  ): Promise<{ users: UserProfileAggregatedAdmin[]; totalPages: number; page: number } | null> {
    const { search, page, limit, location, experienceFilter, roleTypeFilter, sort } = query;
    const skip = (page - 1) * limit;
    console.log(experienceFilter, sort);
    let matchQuery: object = {
      isVerified: true,
      isAdmin: false,
      isBlocked: false,
      role: { $in: roleTypeFilter },
      headline: { $exists: true },
    };

    if (location) {
      const places = location.split(' ');
      const regexes = places.map((place: string) => new RegExp(`^${place}$`, 'i'));
      matchQuery = {
        isVerified: true,
        isAdmin: false,
        isBlocked: false,
        role: { $in: roleTypeFilter },
        $or: [
          { 'location.city': { $in: regexes } },
          { 'location.district': { $in: regexes } },
          { 'location.state': { $in: regexes } },
          { 'location.country': { $in: regexes } },
        ],
      };
    }

    // const aggPipeline: any[] = [
    //   {
    //     $match: matchQuery,
    //   },
    //   {
    //     $lookup: {
    //       from: 'experiences',
    //       localField: '_id',
    //       foreignField: 'userId',
    //       as: 'experiences',
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: 'skills',
    //       localField: '_id',
    //       foreignField: 'userId',
    //       as: 'skills',
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: 'follows',
    //       localField: '_id',
    //       foreignField: 'following',
    //       as: 'followers',
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: 'connectionrequests',
    //       localField: '_id',
    //       foreignField: 'receiver',
    //       as: 'connectionRequests',
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: 'recruiters',
    //       localField: '_id',
    //       foreignField: 'userId',
    //       as: 'recruiterProfile',
    //     },
    //   },
    //   { $unwind: { path: '$recruiterProfile', preserveNullAndEmptyArrays: true } },
    // ];

    // const searchQuery = {
    //   $match: {
    //     $or: [
    //       { name: { $regex: new RegExp(search, 'i') } },
    //       { headline: { $regex: new RegExp(search, 'i') } },
    //     ],
    //   },
    // };

    //rebuidling proper aggregation pipeline with facet
    const result = await UserDAO.aggregate([
      {
        $match: {
          ...matchQuery,
          $or: [
            { name: { $regex: new RegExp(search, 'i') } },
            { headline: { $regex: new RegExp(search, 'i') } },
          ],
        },
      },
      {
        $facet: {
          users: [
            {
              $lookup: {
                from: 'experiences',
                localField: '_id',
                foreignField: 'userId',
                as: 'experiences',
              },
            },
            {
              $lookup: {
                from: 'skills',
                localField: '_id',
                foreignField: 'userId',
                as: 'skills',
              },
            },
            {
              $lookup: {
                from: 'follows',
                localField: '_id',
                foreignField: 'following',
                as: 'followers',
              },
            },
            {
              $lookup: {
                from: 'connectionrequests',
                localField: '_id',
                foreignField: 'receiver',
                as: 'connectionRequests',
              },
            },
            {
              $lookup: {
                from: 'recruiters',
                localField: '_id',
                foreignField: 'userId',
                as: 'recruiterProfile',
              },
            },
            { $unwind: { path: '$recruiterProfile', preserveNullAndEmptyArrays: true } },
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },
          ],
          metaData: [{ $count: 'totalDocs' }],
        },
      },
    ]);

    const users = result[0]?.users;
    const totalDocs = result[0]?.metaData[0]?.totalDocs;
    const totalPages = Math.ceil(totalDocs / limit);

    // aggPipeline.push(searchQuery, { $skip: skip }, { $limit: limit });

    // const users = await UserDAO.aggregate(aggPipeline);
    // const totalDocs = await UserDAO.aggregate([
    //   ...aggPipeline,
    //   searchQuery,
    //   { $count: 'totalDocs' },
    // ]);

    // const totalPages = (totalDocs[0]?.totalDocs || 0) / limit || 0;

    return { users, page, totalPages };
  }

  async addToConnection(userId: string, newConnection: string): Promise<User | null> {
    if (!mongoose.isValidObjectId(userId)) return null;

    const result = await UserDAO.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(userId) },
      { $addToSet: { connections: newConnection } },
      { returnDocument: 'after' }
    );

    return result;
  }

  async removeFromConnection(userId: string, removingConnection: string): Promise<User | null> {
    if (!mongoose.isValidObjectId(userId)) return null;

    const result = await UserDAO.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(userId) },
      { $pull: { connections: removingConnection } },
      { returnDocument: 'after' }
    );

    return result;
  }

  async getUserMetaData(userId: string): Promise<UserCachedData | null> {
    if (!mongoose.isValidObjectId(userId)) return null;
    //get cached data
    //const cachedData: UserCachedData | undefined = await redisClient.hGetAll(`${userId}`);
    //cached data if abailable?
    // if (cachedData && cachedData._id) {
    //   return {
    //     _id: cachedData._id,
    //     name: cachedData.name,
    //     email: cachedData.email,
    //     headline: cachedData.headline,
    //     profilePicture: cachedData.profilePicture,
    //     role: cachedData.role,
    //   };
    // }
    //if cached data is not available, then fetch data from mongodatabase -> store into redis for next use -> return data
    // const userData = await UserDAO.findOne({ _id: new mongoose.Types.ObjectId(userId) });
    const userData = await UserDAO.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: 'subscriptions',
          localField: '_id',
          foreignField: 'userId',
          as: 'subscriptionDetails',
        },
      },
      { $unwind: { path: '$subscriptionDetails', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'plans',
          localField: 'subscriptionDetails.planId',
          foreignField: '_id',
          as: 'planDetails',
        },
      },
      { $unwind: { path: '$planDetails', preserveNullAndEmptyArrays: true } },
    ]);
    const user = userData[0];
    if (!user) return null;
    //set user data into redis for future request
    const newCacheData: UserCachedData = {
      _id: `${user._id}` || '',
      name: `${user.name}` || '',
      email: `${user.email}` || '',
      headline: `${user.headline ? user.headline : ''}` || '',
      profilePicture:
        `${user.profilePicture?.cloudinarySecureUrl ? user.profilePicture.cloudinarySecureUrl : ''}` ||
        '',
      role: `${user.role ? user.role[0] : 'user'}`,
      subscription: {
        planId: user?.planDetails?._id || '',
        subscriptionId: user?.subscriptionDetails?._id || '',
        name: user?.planDetails?.name,
      },
    };

    //await redisClient.multi().hSet(`${userId}`, newCacheData).expire(`${userId}`, 1800);

    return newCacheData;
  }

  async addToHiddenPost(userId: string, postId: string): Promise<User | null> {
    if (!mongoose.isValidObjectId(userId) || !mongoose.isValidObjectId(postId)) return null;

    const result = await UserDAO.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(userId) },
      { $addToSet: { hiddenPosts: postId } },
      { returnDocument: 'after' }
    );

    return result;
  }

  async removeFromHiddenPost(userId: string, postId: string): Promise<User | null> {
    const result = await UserDAO.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(userId) },
      { $pull: { hiddenPosts: postId } },
      { returnDocument: 'after' }
    );

    return result;
  }

  async findByUserId(userId: string): Promise<MyProfileAggregated | null> {
    if (!mongoose.isValidObjectId(userId)) return null;

    const result = await UserDAO.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(userId) } },
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
          from: 'jobapplications',
          localField: '_id',
          foreignField: 'userId',
          as: 'applicationsCount',
        },
      },
      {
        $lookup: {
          from: 'favoriteJobs',
          localField: '_id',
          foreignField: 'userId',
          as: 'savedJobs',
        },
      },
    ]);

    return result[0];
  }

  async updateAccountAction(userId: string, action: AccountAction): Promise<User | null> {
    if (!mongoose.isValidObjectId(userId)) return null;

    const result = await UserDAO.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(userId) },
      { $push: { accountActions: action } },
      { returnDocument: 'after' }
    );

    return result;
  }

  async getSimilarUsersWithSkills(
    skills: string[],
    userId: string,
    similarEducations: string[],
    similarStudiedInstitutions: string[],
    similarJobRoleWorked: string[],
    similarCompanyWorked: string[],
    similarHeadline: string[],
    similarCity: string[],
    similarDistrict: string[],
    similarState: string[],
    similarCountry: string[],
    similarPincode: string[]
  ): Promise<User[] | null> {
    const users = await UserDAO.aggregate([
      {
        $lookup: {
          from: 'skills',
          localField: '_id',
          foreignField: 'userId',
          as: 'skills',
        },
      },
      {
        $lookup: {
          from: 'experiences',
          localField: '_id',
          foreignField: 'userId',
          as: 'experiences',
        },
      },
      {
        $lookup: {
          from: 'educations',
          localField: '_id',
          foreignField: 'userId',
          as: 'educations',
        },
      },
      {
        $match: {
          // 'skills.skill': { $in: skills },
          isAdmin: false,
          _id: { $ne: new mongoose.Types.ObjectId(userId) },
          $or: [
            { headline: { $in: similarHeadline } },
            { 'location.city': { $in: similarCity } },
            { 'location.district': { $in: similarDistrict } },
            { 'location.state': { $in: similarState } },
            { 'location.country': { $in: similarCountry } },
            { 'location.pincode': { $in: similarPincode } },
            { 'experiences.jobRole': { $in: similarJobRoleWorked } },
            { 'experiences.organization': { $in: similarCompanyWorked } },
            { 'skills.skill': { $in: skills } },
            {
              'educations.educationStream': {
                $in: similarEducations,
              },
            },
            {
              'educations.institution': {
                $in: similarStudiedInstitutions,
              },
            },
          ],
        },
      },
      { $limit: 4 },
    ]);

    return users;
  }

  async getUserFullProfileDataAggregated(userId: string): Promise<UserFullProfileData | null> {
    const result = await UserDAO.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: 'experiences',
          localField: '_id',
          foreignField: 'userId',
          as: 'experiences',
        },
      },
      {
        $lookup: {
          from: 'educations',
          localField: '_id',
          foreignField: 'userId',
          as: 'educations',
        },
      },
      {
        $lookup: {
          from: 'skills',
          localField: '_id',
          foreignField: 'userId',
          as: 'skills',
        },
      },
      {
        $lookup: {
          from: 'certificates',
          localField: '_id',
          foreignField: 'userId',
          as: 'certificates',
        },
      },
    ]);

    return result[0];
  }

  async updateProfileView(
    viewerId: string,
    profileId: string
  ): Promise<{ _id: string; views: string[] } | null> {
    if (!mongoose.isValidObjectId(viewerId)) return null;

    const result = await UserDAO.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(profileId) },
      { $addToSet: { views: viewerId } },
      { returnDocument: 'after' }
    );

    return result as { _id: string; views: string[] };
  }

  async getConnections(
    userId: string,
    page: number,
    limit: number,
    search: string
  ): Promise<ConnectionWithSenderDetails[] | null> {
    const skip = (page - 1) * limit;
    const result = await UserDAO.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(userId) } },
      {
        $facet: {
          connections: [
            {
              $unwind: {
                path: '$connections',
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $lookup: {
                from: 'users',
                localField: 'connections',
                foreignField: '_id',
                as: 'connectedUserDetails',
              },
            },
            {
              $unwind: {
                path: '$connectedUserDetails',
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $project: {
                'connectedUserDetails._id': 1,
                'connectedUserDetails.name': 1,
                'connectedUserDetails.headline': 1,
                'connectedUserDetails.profilePicture': 1,
              },
            },
            { $match: { 'connectedUserDetails.name': { $regex: new RegExp(search, 'i') } } },
            { $skip: skip },
            { $limit: limit },
          ],
        },
      },
    ]);

    const connections = result[0]?.connections;
    return connections;
  }
}
