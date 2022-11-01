import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ unique: [true, 'Duplicate email etnered'] })
  uid: string;

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

export const userSchema = SchemaFactory.createForClass(User);
