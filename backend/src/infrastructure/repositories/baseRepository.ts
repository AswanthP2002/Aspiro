import IBaseRepo from '../../domain/interfaces/IBaseRepo';
import mongoose, { Model } from 'mongoose';

export default class BaseRepository<T> implements IBaseRepo<T> {
  private readonly _model: Model<T>;
  constructor(model: Model<T>) {
    this._model = model;
  } //changed the collection name for testing error

  async create(entity: T): Promise<T | null> {
    const result = await this._model.insertOne(entity);
    return result.toObject();
  }

  async findById(id: string): Promise<T | null> {
    const result = await this._model.findOne({
      _id: new mongoose.Types.ObjectId(id),
    });
    return result;
  }

  async update(id: string, updateEntity: Partial<T>): Promise<T | null> {
    if (!id || !updateEntity) {
      return null;
    }
    const result = await this._model.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: updateEntity },
      { returnDocument: 'after' }
    );
    return result;
  }

  async delete(id: string): Promise<void> {
    await this._model.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
  }
}
