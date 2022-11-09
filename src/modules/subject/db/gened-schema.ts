import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IdentifiableEntitySchema } from 'src/database/identifiable-entity-schema';
import { IDateTime } from '../subject.types';

@Schema({ versionKey: false })
export class ExamDateTime extends Document {
  @Prop()
  readonly start: string;

  @Prop()
  readonly end: string;
}

export const ExamDateSchema = SchemaFactory.createForClass(ExamDateTime);

@Schema({ versionKey: false, collection: 'GenEd' })
export class GenEdSchema extends IdentifiableEntitySchema {
  @Prop()
  readonly subjectId: string;

  @Prop()
  readonly name: string;

  @Prop()
  readonly sec: string;

  @Prop()
  readonly secPair: string;

  @Prop()
  readonly lectOrPrac: string;

  @Prop()
  readonly classDateTime: string;

  @Prop({ type: ExamDateTime })
  readonly midtermDateTime: IDateTime;

  @Prop({ type: ExamDateTime })
  readonly finalDateTime: IDateTime;

  @Prop()
  readonly credit: number;

  @Prop()
  readonly teachers: string;
}
