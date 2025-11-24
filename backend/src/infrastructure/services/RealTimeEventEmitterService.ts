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

    addPostComment(postId: string, userId: string, commentId: string, text: string): void {
        this._io.emit('commentAdded', {postId, userId, commentId, text})
    }

    deletePostComment(postId: string, commentId: string, userId: string): void {
        this._io.emit('commentDeleted', {postId, commentId, userId})
    }
}