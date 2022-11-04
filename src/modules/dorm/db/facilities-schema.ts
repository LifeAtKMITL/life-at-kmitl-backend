import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IdentifiableEntitySchema } from 'src/database/identifiable-entity-schema';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class Facilities extends Document {
  @Prop()
  readonly aircon: Boolean;
  @Prop()
  readonly furniture: Boolean;
  @Prop()
  readonly waterHeater: Boolean;
  @Prop()
  readonly fan: Boolean;
  @Prop()
  readonly TV: Boolean;
  @Prop()
  readonly fridge: Boolean;
  @Prop()
  readonly parking: Boolean;
  @Prop()
  readonly freeWifi: Boolean;
  @Prop()
  readonly keyCard: Boolean;
  @Prop()
  readonly CCTV: Boolean;
  @Prop()
  readonly luandry: Boolean;
}
export const FacilitiesSchema = SchemaFactory.createForClass(Facilities);
