import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IdentifiableEntitySchema } from 'src/database/identifiable-entity-schema';
import { IExamDateTime } from '../subject.types';

@Schema({ versionKey: false })
export class ExamDateTime extends Document {
  @Prop()
  readonly start: string;

  @Prop()
  readonly end: string;
}

export const ExamDateSchema = SchemaFactory.createForClass(ExamDateTime);

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

  @Prop({ type: ExamDateTime })
  readonly midtermDateTime: IExamDateTime;

  @Prop({ type: ExamDateTime })
  readonly finalDateTime: IExamDateTime;

  @Prop()
  readonly credit: number;

  @Prop()
  readonly teachers: string;
}
