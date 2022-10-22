import { Prop, Schema } from '@nestjs/mongoose';
import { IdentifiableEntitySchema } from 'src/database/identifiable-entity-schema';

@Schema({ versionKey: false, collection: 'Sharenote' })
export class SharenoteSchema extends IdentifiableEntitySchema {
  @Prop()
  readonly name: string;

  @Prop()
  readonly sec: string;

  @Prop()
  readonly credit: number;

  @Prop([String])
  readonly teachers: string[];
}
