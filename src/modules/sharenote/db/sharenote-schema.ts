import { Prop, Schema } from '@nestjs/mongoose';
import { IdentifiableEntitySchema } from 'src/database/identifiable-entity-schema';

@Schema({ versionKey: false, collection: 'Sharenote' })
export class SharenoteSchema extends IdentifiableEntitySchema {
  @Prop()
  readonly userId: string;

  @Prop()
  readonly userName: string;

  @Prop()
  readonly sharenoteCollectionName: string;

  @Prop()
  readonly pathFiles: string[];

  @Prop()
  readonly likeCount: number;

  @Prop()
  readonly dowloadCount: number;

  @Prop([String])
  readonly teachers: string[];

  @Prop()
  readonly date: Date;
}
