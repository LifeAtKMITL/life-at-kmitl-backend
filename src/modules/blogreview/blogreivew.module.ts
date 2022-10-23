import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { SubjectCommandHandlers } from './commands';
import { BlogreviewEntityRepository } from './db/blogreview-entity.repository';
import { BlogreviewSchema } from './db/blogreview-schema';
import { BlogreviewSchemaFactory } from './db/blogreview-schema.factory';
import { SubjectController } from './blogreview.controller';
import { SubjectFactory } from './blogreview.factory';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: BlogreviewSchema.name, schema: SchemaFactory.createForClass(BlogreviewSchema) }]),
  ],
  controllers: [SubjectController],
  providers: [SubjectFactory, BlogreviewEntityRepository, BlogreviewSchemaFactory, ...SubjectCommandHandlers],
})
export class BlogreviewModule {}
