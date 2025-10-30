export default interface CreatePostDTO {
  creatorId?: string                 
  media : Buffer
  description: string
  likes?: any[]         
}

export interface PostDTO {
  _id?: string
  creatorId?: string                 
  media : {
    cloudUrl : string
    publicId : string
  }
  description: string
  likes?: any[]         
  createdAt?: string
  updatedAt?: string
}


