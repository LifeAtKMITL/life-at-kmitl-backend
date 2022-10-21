import { Module } from '@nestjs/common';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { SubjectCommandHandlers } from './commands';
import { SubjectSchema } from './db/subject-schema';
import { SubjectController } from './subject.controller';
import { SubjectFactory } from './subject.factory';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SubjectSchema.name, schema: SchemaFactory.createForClass(SubjectSchema) }]),
  ],
  controllers: [SubjectController],
  providers: [SubjectFactory, ...SubjectCommandHandlers],
})
export class SubjectModule {}
