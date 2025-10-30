export default interface Post {
  _id?: string
  creatorId?: string                 
  media : {
    cloudUrl : string
    publicId : string
  }
  description : string
  likes?: any[]       
  createdAt?: string
  updatedAt?: string
}
