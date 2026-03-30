export default interface Comments {
  _id?: string;
  postId?: string;
  userId?: string;
  parentId?: string | null;
  text: string;
  depth?: number;
  likes?: number;
  replyCount?: number;
  createdAt?: string | Date;
}
