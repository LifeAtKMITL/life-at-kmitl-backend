import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IdentifiableEntitySchema } from 'src/database/identifiable-entity-schema';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class Bill extends Document {
  @Prop()
  readonly waterBill: Boolean;
  @Prop()
  readonly electricityBill: Boolean;
}
export const BillSchema = SchemaFactory.createForClass(Bill);
