export default interface Post {
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
