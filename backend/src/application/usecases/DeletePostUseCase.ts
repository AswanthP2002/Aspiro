import IPostRepo from "../../domain/interfaces/IPostRepo";
import IDeletePos from "./interfaces/IDeletePostUseCase";

export default class DeleletPost implements IDeletePos {
    constructor(private _repo : IPostRepo) {}

    async execute(id: string, creatorId : string): Promise<void> {
        //find post before deleting
        const post = await this._repo.getPostById(id)
        if(!post) throw new Error('Post not found')
        
        if(post.creatorId !== creatorId){
            throw new Error('You cant delete this post')
        }
        
        await this._repo.delete(id)
    }
}