export default interface CreatePostDTO {
  creatorId?: string                 
  media : Buffer
  description: string
  likes?: string[]         
}

export interface PostDTO {
  _id?: string
  creatorId?: string                 
  media : {
    cloudUrl : string
    publicId : string
  }
  description: string
  likes?: string[]         
  createdAt?: string
  updatedAt?: string
}


