export default interface CreatePostDTO {
  creatorId?: string                 
  creatorType: "candidate" | "recruiter"
  media : any
  content: string
  likes?: any[]         
}

export interface CreatePostResDTO {
  _id?: string
  creatorId?: string                 
  creatorType: "candidate" | "recruiter"
  media : {
    url : string
    publidId : string
  }
  content: string
  likes?: any[]         
  createdAt?: string
  updatedAt?: string
}


