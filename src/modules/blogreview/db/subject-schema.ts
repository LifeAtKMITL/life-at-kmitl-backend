import { Prop, Schema } from '@nestjs/mongoose';
import { IdentifiableEntitySchema } from 'src/database/identifiable-entity-schema';

@Schema({ versionKey: false, collection: 'Subject' })
export class SubjectSchema extends IdentifiableEntitySchema {
  @Prop()
  readonly name: string;

  @Prop()
  readonly sec: string;

  @Prop()
  readonly credit: number;

  @Prop([String])
  readonly teachers: string[];
}
