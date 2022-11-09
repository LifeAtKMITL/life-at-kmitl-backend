import { Prop, Schema } from '@nestjs/mongoose';
import { IdentifiableEntitySchema } from 'src/database/identifiable-entity-schema';

@Schema({ versionKey: false, collection: 'Blogreview' })
export class BlogreviewSchema extends IdentifiableEntitySchema {
  @Prop()
  readonly subjectId: string;
  @Prop()
  readonly subjectName: string;

  @Prop()
  readonly textSubjectReview: string;

  @Prop()
  readonly userId: string;

  @Prop()
  readonly likeCount: number;

  @Prop()
  readonly date: Date;
}
