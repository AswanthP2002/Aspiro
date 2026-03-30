export default interface Post {
  _id?: string;
  userId?: string;
  media?: {
    cloudUrl: string;
    publicId: string;
  };
  mediaType?: string;
  description?: string;
  likes?: string[];
  shares?: string[];
  views?: string[];
  createdAt?: string;
  updatedAt?: string;
}
