import Follow from '../follow/follow.entity';
import JobApplication from '../jobApplication/jobApplication.entity';
import FavoriteJobs from '../savedJob/favoriteJobs.entity';
import User from './User.FIX';

export default interface MyProfileAggregated extends User {
  followers?: Follow[];
  applicationsCount?: JobApplication[];
  savedJobs?: FavoriteJobs[]
}
