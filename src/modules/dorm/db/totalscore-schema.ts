import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IdentifiableEntitySchema } from 'src/database/identifiable-entity-schema';

@Schema({ _id: false })
export class Totalscore extends IdentifiableEntitySchema {
  @Prop()
  readonly userID: string;
  @Prop()
  public score: number;
}
export const TotalscoreSchema = SchemaFactory.createForClass(Totalscore);
