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

  @Prop([Object])
  readonly room: Object[];

  @Prop()
  readonly imagePath: string[];

  @Prop()
  readonly zone: string;

  // @Prop()
  readonly bills: Object;

  // @Prop()
  readonly facilities: Object;

  // @Prop([Object])
  readonly totalScore: Object[];
}
