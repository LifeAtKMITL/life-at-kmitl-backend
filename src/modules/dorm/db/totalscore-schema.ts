import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class Totalscore extends Document {
  @Prop()
  readonly userID: string;
  @Prop()
  public score: number;
}
export const TotalscoreSchema = SchemaFactory.createForClass(Totalscore);
