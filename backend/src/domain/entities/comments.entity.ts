export default interface Comments {
  _id: string;
  postId?: string;
  userId?: string;
  text: string;
  createdAt: string | Date;
}
