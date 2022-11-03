import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { SubjectCommandHandlers } from './commands';
import { SubjectDtoRepository } from './db/subject-dto.repository';
import { SubjectEntityRepository } from './db/subject-entity.repository';
import { SubjectSchema } from './db/subject-schema';
import { SubjectSchemaFactory } from './db/subject-schema.factory';
import { SubjectQueryHandlers } from './queries';
import { SubjectController } from './subject.controller';
import { SubjectFactory } from './subject.factory';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: SubjectSchema.name, schema: SchemaFactory.createForClass(SubjectSchema) }]),
  ],
  controllers: [SubjectController],
  providers: [
    SubjectFactory,
    SubjectEntityRepository,
    SubjectSchemaFactory,
    SubjectDtoRepository,
    ...SubjectCommandHandlers,
    ...SubjectQueryHandlers,
  ],
})
export class SubjectModule {}
