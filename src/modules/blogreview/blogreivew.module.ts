import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { SubjectCommandHandlers } from './commands';
import { SubjectEntityRepository } from './db/subject-entity.repository';
import { SubjectSchema } from './db/subject-schema';
import { SubjectSchemaFactory } from './db/subject-schema.factory';
import { SubjectController } from './blogreview.controller';
import { SubjectFactory } from './blogreview.factory';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: SubjectSchema.name, schema: SchemaFactory.createForClass(SubjectSchema) }]),
  ],
  controllers: [SubjectController],
  providers: [SubjectFactory, SubjectEntityRepository, SubjectSchemaFactory, ...SubjectCommandHandlers],
})
export class BlogreviewModule {}
