import { model } from "mongoose";
import FavoriteJobs from "../../../../domain/entities/candidate/favoriteJobs";
import { FavoriteJobSchema } from "../../Schemas/candidate/favoriteJob.schema";

export const FavoriteJobsDAO = model<FavoriteJobs>('favoritejob', FavoriteJobSchema)