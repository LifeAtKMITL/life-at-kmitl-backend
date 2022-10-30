import { FirebaseModule } from './../../firebase/firebase.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { SharenoteCommandHandlers } from './commands';
import { SharenoteEntityRepository } from './db/sharenote-entity.repository';
import { SharenoteSchema } from './db/sharenote-schema';
import { SharenoteSchemaFactory } from './db/sharenote-schema.factory';
import { SharenoteController } from './sharenote.controller';
import { SharenoteFactory } from './sharenote.factory';
import { FileService } from 'src/firebase/services/file.service';
import { FirebaseService } from 'src/firebase/services/firebase.service';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: SharenoteSchema.name, schema: SchemaFactory.createForClass(SharenoteSchema) }]),
    FirebaseModule,
  ],
  controllers: [SharenoteController],
  providers: [SharenoteFactory, SharenoteEntityRepository, SharenoteSchemaFactory, ...SharenoteCommandHandlers],
})
export class SharenoteModule {}
