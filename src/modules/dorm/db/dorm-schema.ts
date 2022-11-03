import { Prop, Schema } from '@nestjs/mongoose';
import { IdentifiableEntitySchema } from 'src/database/identifiable-entity-schema';

@Schema({ versionKey: false, collection: 'Dorm' })
export class DormSchema extends IdentifiableEntitySchema {
  @Prop()
  readonly name: string;

  @Prop()
  readonly description: string;
}
