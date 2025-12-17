export default interface CreatePostDTO {
  userId?: string                 
  media : Buffer
  description: string        
}

export interface PostDTO {
  _id?: string
  userId?: string                 
  media? : {
    cloudUrl : string
    publicId : string
  }
  description: string
  likes?: string[]   
  shares?: string[]
  views?: string[]     
  createdAt?: string
  updatedAt?: string
}


/**
 *  _id?: string
  userId?: string                 
  media : {
    cloudUrl : string
    publicId : string
  }
  description : string
  likes?: string[]
  shares?: string[]
  views?: string[]    
  createdAt?: string
  updatedAt?: string
 */