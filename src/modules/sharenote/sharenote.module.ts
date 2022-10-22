import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { SharenoteCommandHandlers } from './commands';
import { SharenoteEntityRepository } from './db/sharenote-entity.repository';
import { SharenoteSchema } from './db/sharenote-schema';
import { SharenoteSchemaFactory } from './db/sharenote-schema.factory';
import { SharenoteController } from './sharenote.controller';
import { SharenoteFactory } from './sharenote.factory';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: SharenoteSchema.name, schema: SchemaFactory.createForClass(SharenoteSchema) }]),
  ],
  controllers: [SharenoteController],
  providers: [SharenoteFactory, SharenoteEntityRepository, SharenoteSchemaFactory, ...SharenoteCommandHandlers],
})
export class SharenoteModule {}
