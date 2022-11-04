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
      genedFaved: user.getGenedFaved(),
      subjectsLiked: user.getSubjectsLiked(),
      subjectsBookmarked: user.getSubjectsBookmarked(),
      dormsLiked: user.getDormsLiked(),
      dormsScored: user.getDormsScored(),
      notesLinked: user.getNotesLiked(),
    };
  }

  createFromScehma(userSchema: UserSchema): User {
    return new User(
      userSchema._id.toString(),
      userSchema.userId,
      userSchema.username,
      userSchema.image,
      userSchema.genedFaved,
      userSchema.subjectsLiked,
      userSchema.subjectsBookmarked,
      userSchema.dormsLiked,
      userSchema.dormsScored,
      userSchema.notesLinked,
    );
  }
}
