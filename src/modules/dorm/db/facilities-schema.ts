import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IdentifiableEntitySchema } from 'src/database/identifiable-entity-schema';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class Facilities extends Document {
  @Prop()
  readonly utl: string;
  @Prop()
  readonly value: Boolean;
  
}
export const FacilitiesSchema = SchemaFactory.createForClass(Facilities);
