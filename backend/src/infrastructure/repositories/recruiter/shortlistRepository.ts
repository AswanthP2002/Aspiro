import { Db } from 'mongodb';
import Shortlist from '../../../domain/entities/recruiter/shortlist.entity';
import IShortlistRepo from '../../../domain/interfaces/recruiter/IShortlistRepo';
import BaseRepository from '../baseRepository';
import mongoose from 'mongoose';

export default class ShortlistRepository
  extends BaseRepository<Shortlist>
  implements IShortlistRepo
{
  db: Db;
  collection: string;
  constructor(db: Db) {
    super(db, 'shortlist');
    this.db = db;
    this.collection = 'shortlist';
  }

  async getShortlistDataAggregated(jobId: string): Promise<any[]> {
    const result = await this.db
      .collection<Shortlist>(this.collection)
      .aggregate([
        [
          {
            $match: { jobId: new mongoose.Types.ObjectId(jobId) },
          },
          {
            $addFields: {
              appObjectIds: {
                $map: {
                  input: '$applicationIds',
                  as: 'id',
                  in: { $toObjectId: '$$id' },
                },
              },
            },
          },
          {
            $lookup: {
              from: 'jobApplication',
              localField: 'appObjectIds',
              foreignField: '_id',
              as: 'applications',
            },
          },
          {
            $lookup: {
              from: 'candidate',
              localField: 'applications.candidateId',
              foreignField: '_id',
              as: 'candidates',
            },
          },
          { $unwind: '$candidates' },
        ],
      ])
      .toArray();

    return result;
  }
}
