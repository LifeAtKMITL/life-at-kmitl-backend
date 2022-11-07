import { Prop, Schema } from '@nestjs/mongoose';
import { IdentifiableEntitySchema } from 'src/database/identifiable-entity-schema';

@Schema({ versionKey: false, collection: 'DormReview' })
export class DormReviewSchema extends IdentifiableEntitySchema {
  @Prop()
  readonly dormId: string;
  @Prop()
  readonly userId: string;
  @Prop()
  readonly textReview: string;
}
