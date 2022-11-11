import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { SubjectCommandHandlers } from './commands';
import { GenEdSchema } from './db/gened-schema';
import { GenEdSchemaFactory } from './db/gened-schema.factory';
import { GenEdRepository } from './db/gened.repository';
import { SubjectDtoFactory } from './db/subject-dto.factory';
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
    MongooseModule.forFeature([{ name: GenEdSchema.name, schema: SchemaFactory.createForClass(GenEdSchema) }]),
    AuthModule,
  ],
  controllers: [SubjectController],
  providers: [
    SubjectFactory,
    SubjectEntityRepository,
    SubjectSchemaFactory,
    SubjectDtoRepository,
    GenEdSchema,
    GenEdRepository,
    GenEdSchemaFactory,
    SubjectDtoFactory,
    ...SubjectCommandHandlers,
    ...SubjectQueryHandlers,
  ],
})
export class SubjectModule {}
