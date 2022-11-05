import { DatabaseModule } from './../../database/database.module';
import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { MulterModule } from '@nestjs/platform-express';
import { GridFsMulterConfigService } from './multer-config.service';
import { FilesService } from './files.service';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { SharenoteSchema } from '../sharenote/db/sharenote-schema';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: SharenoteSchema.name, schema: SchemaFactory.createForClass(SharenoteSchema) }]),
    // MulterModule.registerAsync({
    //   useClass: GridFsMulterConfigService,
    // }),
  ],
  controllers: [FilesController],
  providers: [GridFsMulterConfigService, FilesService],
})
export class FilesModule {}
