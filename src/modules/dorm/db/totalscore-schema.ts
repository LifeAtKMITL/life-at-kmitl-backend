import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IdentifiableEntitySchema } from 'src/database/identifiable-entity-schema';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class Totalscore extends Document {
  @Prop()
  readonly userID: string;
  @Prop()
  readonly score: number;
}
export const TotalscoreSchema = SchemaFactory.createForClass(Totalscore);
