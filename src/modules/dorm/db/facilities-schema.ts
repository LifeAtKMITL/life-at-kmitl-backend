import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class Facilities extends Document {
  @Prop()
  readonly utl: string;
  @Prop()
  readonly value: boolean;
}
export const FacilitiesSchema = SchemaFactory.createForClass(Facilities);
