import { Totalscore } from './totalscore-schema';
import { Bill } from './bill-schema';
import { Facilities, FacilitiesSchema } from './facilities-schema';
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
  readonly room: Object[];

  @Prop()
  readonly imagePath: string[];

  @Prop()
  readonly zone: string[];

  @Prop(Bill)
  readonly bills: Bill;

  @Prop(Facilities)
  readonly facilities: Facilities;

  @Prop(Totalscore)
  readonly totalScore: Totalscore[];

  @Prop()
  readonly rangePrice: number[];
}
