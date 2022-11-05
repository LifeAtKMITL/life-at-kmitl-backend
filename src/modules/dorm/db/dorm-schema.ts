import { Bill } from './bill-schema';
import { Prop, Schema } from '@nestjs/mongoose';
import { IdentifiableEntitySchema } from 'src/database/identifiable-entity-schema';

@Schema({ versionKey: false, collection: 'Dorm' })
export class DormSchema extends IdentifiableEntitySchema {
  @Prop()
  readonly name: string;

  @Prop()
  readonly tel: string;

  @Prop()
  readonly address: string;

  @Prop()
  readonly room: object[];

  @Prop()
  readonly imagePath: string[];

  @Prop()
  readonly zone: string[];

  @Prop(Bill)
  readonly bills: Bill;

  @Prop(Object)
  readonly facilities: object[];

  @Prop(Object)
  readonly totalScore: object[];

  @Prop()
  readonly rangePrice: number[];
}
