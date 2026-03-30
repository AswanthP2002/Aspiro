import Follow from '../follow/follow.entity';
import User from './User.FIX';

export default interface MyProfileAggregated extends User {
  followers?: Follow[];
}
