import { Prop, Schema } from '@nestjs/mongoose';
import { IdentifiableEntitySchema } from 'src/database/identifiable-entity-schema';

@Schema({ versionKey: false, collection: 'Subject' })
export class SubjectSchema extends IdentifiableEntitySchema {
  @Prop()
  readonly subjectId: string;

  @Prop()
  readonly name: string;

  @Prop()
  readonly sec: string;

  @Prop()
  readonly classDateTime: string;

  @Prop()
  readonly midtermDateTime: string;

  @Prop()
  readonly finalDateTime: string;

  @Prop()
  readonly credit: number;

  @Prop()
  readonly teachers: string;
}
