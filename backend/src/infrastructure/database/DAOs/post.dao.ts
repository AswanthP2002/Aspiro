import { model } from 'mongoose';
import Post from '../../../domain/entities/post/Post';
import { PostSchema } from '../Schemas/Post.schema';

export const PostDAO = model<Post>('post', PostSchema);
