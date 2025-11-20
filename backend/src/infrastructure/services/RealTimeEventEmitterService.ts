import { Server } from "socket.io";
import IRealTimeEventEmitter from "../../application/interfaces/services/IRealTimeEventEmitter";
import { inject, injectable } from "tsyringe";

@injectable()
export class RealTimeEventEmitterService implements IRealTimeEventEmitter {
    constructor(@inject('socketIO') private _io: Server){}

    postLiked(postId: string, userId: string): void {
        this._io.emit('postLiked', {postId, userId})
    }

    postUnliked(postId: string, userId: string): void {
        this._io.emit('postUnliked', {postId, userId})
    
    }

    deletePostComment(postId: string, commentId: string): void {
        this._io.emit('commentDeleted', {postId, commentId})
    }
}