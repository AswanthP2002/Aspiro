import Post from "../../../domain/entities/user/Post";

export default function mapCreatePostDtoToPost(
    createPostDto : {description:string, creatorId:string, likes:any[], media:{cloudUrl:string, publicId:string}}
) : Post {
    return {
        description:createPostDto.description,
        creatorId:createPostDto.creatorId,
        media:{
            cloudUrl:createPostDto.media.cloudUrl,
            publicId:createPostDto.media.publicId
        },
        likes:[]
    }
}

// used empty strings for testing purpose 