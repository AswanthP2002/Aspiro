export default interface UserMetaData {
    _id?: string;
    name?: string;
    headline?: string;
    profilePicture?: {
      cloudinaryPublicId: string;
      cloudinarySecureUrl: string;
    };
}