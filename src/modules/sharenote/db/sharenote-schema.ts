import { Prop, Schema } from '@nestjs/mongoose';
import { IdentifiableEntitySchema } from 'src/database/identifiable-entity-schema';

@Schema({ versionKey: false, collection: 'Sharenote' })
export class SharenoteSchema extends IdentifiableEntitySchema {
  @Prop()
  readonly userId: string;

  @Prop()
  readonly subjectId: string;

  @Prop()
  readonly sharenoteCollectionName: string;

  @Prop()
  readonly sharenoteCollectionNameVersion: string;

  @Prop()
  readonly files: any[];

  @Prop()
  readonly likeCount: number;

  @Prop()
  readonly viewCount: number;

  @Prop([String])
  readonly teachers: string[];

  @Prop()
  readonly date: Date;

  @Prop()
  readonly exam: string;

  @Prop()
  readonly year: string;

  @Prop()
  readonly description: string;
}
