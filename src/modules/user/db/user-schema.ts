import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IdentifiableEntitySchema } from 'src/database/identifiable-entity-schema';

@Schema({ versionKey: false, collection: 'users' })
export class UserSchema extends IdentifiableEntitySchema {
  @Prop({ unique: [true, 'Duplicate userId entered'] })
  userId: string;

  @Prop()
  username: string;

  @Prop()
  image: string;

  @Prop()
  genedFaved: string[];

  @Prop()
  subjectsLiked: string[];

  @Prop()
  subjectsBookmarked: string[];

  @Prop()
  dormsLiked: string[];

  @Prop()
  dormsScored: string[];

  @Prop()
  notesLinked: string[];
}

export const userSchema = SchemaFactory.createForClass(UserSchema);
