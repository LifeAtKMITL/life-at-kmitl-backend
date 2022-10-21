import { Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export abstract class IdentifiableEntitySchema {
  @Prop()
  readonly _id: mongoose.ObjectId;
}
