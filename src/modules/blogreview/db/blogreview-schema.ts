import { Prop, Schema } from '@nestjs/mongoose';
import { IdentifiableEntitySchema } from 'src/database/identifiable-entity-schema';

@Schema({ versionKey: false, collection: 'Blogreview' })
export class BlogreviewSchema extends IdentifiableEntitySchema {
  @Prop()
  readonly subjectID: string;

  @Prop()
  readonly textSubjectReview: string;

  @Prop()
  readonly userID: string;

  @Prop()
  readonly userName: string;

  @Prop([String])
  readonly userID_Liked: string[];

  @Prop()
  readonly rate: number;

  @Prop()
  readonly date: Date;
}
