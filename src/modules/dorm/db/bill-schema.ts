import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class Bill extends Document {
  @Prop()
  readonly waterBill: number;
  @Prop()
  readonly electricityBill: number;
}
export const BillSchema = SchemaFactory.createForClass(Bill);
