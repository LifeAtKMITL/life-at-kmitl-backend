import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IdentifiableEntitySchema } from 'src/database/identifiable-entity-schema';
import { BookmarkedReview, FavoriteGenEd, LikedDorm, LikedNote, LikedReview, ScoredDorm } from '../value-objects';

@Schema({ versionKey: false, collection: 'users' })
export class UserSchema extends IdentifiableEntitySchema {
  @Prop({ unique: [true, 'Duplicate userId entered'] })
  userId: string;

  @Prop()
  username: string;

  @Prop()
  image: string;

  @Prop()
  favGenEds: FavoriteGenEd[];

  @Prop()
  likedReviews: LikedReview[];

  @Prop()
  bookmarkedReviews: BookmarkedReview[];

  @Prop()
  likedDorms: LikedDorm[];

  @Prop()
  scoredDorms: ScoredDorm[];

  @Prop()
  likedNotes: LikedNote[];
}

export const userSchema = SchemaFactory.createForClass(UserSchema);
