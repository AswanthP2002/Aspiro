export default interface CommentsDTO {
  _id?: string;
  postId?: string;
  userId?: string;
  text: string;
  createdAt?: string | Date;
}


export interface CreateCommentDto {
  postId: string;
  userId: string;
  text: string;
}