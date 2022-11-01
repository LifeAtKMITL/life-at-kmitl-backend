import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  name: string;

  @Prop({ unique: [true, 'Duplicate email etnered'] })
  email: string;

  @Prop({ select: false })
  password: string;
}

export const userSchema = SchemaFactory.createForClass(User);
