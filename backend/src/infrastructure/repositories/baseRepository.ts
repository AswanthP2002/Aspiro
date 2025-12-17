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

  async find(): Promise<T[] | null> {
    const result = await this._model.find();
    return result;
  }

  async findById(id: string): Promise<T | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null; // Return null if the ID format is invalid
    }
    const result = await this._model.findOne({
      _id: new mongoose.Types.ObjectId(id),
    }); // Use .lean() for better performance and a plain object
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
    console.log('delete profposed id', id)
    const result = await this._model.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
    console.log('is dleted or not', result.deletedCount)

  }
}
