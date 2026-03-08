export default interface CommentsDTO {
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

export interface CreateCommentDto {
  postId: string;
  userId: string;
  text: string;
  parentId: string | null;
  depth?: number;
}
