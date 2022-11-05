import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { BlogreviewCommandHandlers } from './commands';
import { BlogreviewEntityRepository } from './db/blogreview-entity.repository';
import { BlogreviewSchema } from './db/blogreview-schema';
import { BlogreviewSchemaFactory } from './db/blogreview-schema.factory';
import { BlogreviewController } from './blogreview.controller';
import { BlogreviewFactory } from './blogreview.factory';
import { BlogreviewQueryHandlers } from './queries';
import { BlogreviewDtoRepository } from './db/blogreview-dto.repository';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: BlogreviewSchema.name, schema: SchemaFactory.createForClass(BlogreviewSchema) }]),
  ],
  controllers: [BlogreviewController],
  providers: [BlogreviewFactory, BlogreviewEntityRepository, BlogreviewSchemaFactory,
     ...BlogreviewCommandHandlers, ...BlogreviewQueryHandlers, BlogreviewDtoRepository],
})
export class BlogreviewModule {}
