import mongoose from 'mongoose';
import { EntitySchemaFactory } from 'src/database/entity-schema.factory';
import { User } from '../User';
import { UserSchema } from './user-schema';

export class UserSchemaFactory implements EntitySchemaFactory<UserSchema, User> {
  create(user: User): UserSchema {
    return {
      _id: new mongoose.Types.ObjectId(user.getId()),
      userId: user.getUserId(),
      username: user.getUsername(),
      image: user.getImage(),
      favGenEds: user.getFavGenEd(),
      likedReviews: user.getLikedReviews(),
      bookmarkedReviews: user.getBookmarkedReviews(),
      likedDorms: user.getLikedDorms(),
      scoredDorms: user.getScoredDorms(),
      likedNotes: user.getLikedNotes(),
    };
  }

  createFromScehma(userSchema: UserSchema): User {
    return new User(
      userSchema._id.toString(),
      userSchema.userId,
      userSchema.username,
      userSchema.image,
      userSchema.favGenEds,
      userSchema.likedReviews,
      userSchema.bookmarkedReviews,
      userSchema.likedDorms,
      userSchema.scoredDorms,
      userSchema.likedNotes,
    );
  }
}
