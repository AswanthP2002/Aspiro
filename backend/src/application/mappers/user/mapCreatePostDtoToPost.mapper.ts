import Post from "../../../domain/entities/user/Post";

export default function mapCreatePostDtoToPost(
    createPostDto : {description:string, userId:string, media:{cloudUrl:string, publicId:string}}
) : Post {
    return {
        description:createPostDto.description,
        userId:createPostDto.userId,
        media:{
            cloudUrl:createPostDto.media.cloudUrl,
            publicId:createPostDto.media.publicId
        },
        likes:[]
    }
}

// used empty strings for testing purpose 