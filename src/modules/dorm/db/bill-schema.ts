import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IdentifiableEntitySchema } from 'src/database/identifiable-entity-schema';

@Schema({ _id: false })
export class Bill extends IdentifiableEntitySchema {
  @Prop()
  readonly waterBill: number;
  @Prop()
  readonly electricityBill: number;
}
export const BillSchema = SchemaFactory.createForClass(Bill);
