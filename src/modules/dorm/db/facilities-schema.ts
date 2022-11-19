import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IdentifiableEntitySchema } from 'src/database/identifiable-entity-schema';

@Schema({ _id: false })
export class Facilities extends IdentifiableEntitySchema {
  @Prop()
  readonly utl: string;
  @Prop()
  readonly value: boolean;
}
export const FacilitiesSchema = SchemaFactory.createForClass(Facilities);
