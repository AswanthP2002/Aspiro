import { model } from "mongoose";
import Follow from "../../../domain/entities/Follow";
import { FollowSchema } from "../Schemas/follow.schema";

export const FollowDAO = model<Follow>('follow', FollowSchema)