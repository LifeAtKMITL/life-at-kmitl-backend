import { DormQueryHandlers } from './queries/index';
import { DormDtoRepository } from './db/dorm-dto.repository';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { DormCommandHandlers } from './commands';
import { DormEntityRepository } from './db/dorm-entity.repository';
import { DormSchema } from './db/dorm-schema';
import { DormSchemaFactory } from './db/dorm-schema.factory';
import { DormController } from './dorm.controller';
import { DormFactory } from './dorm.factory';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: DormSchema.name, schema: SchemaFactory.createForClass(DormSchema) }]),
  ],
  controllers: [DormController],
  providers: [
    DormFactory,
    DormEntityRepository,
    DormSchemaFactory,
    DormDtoRepository,
    ...DormCommandHandlers,
    ...DormQueryHandlers,
  ],
})
export class DormModule {}
