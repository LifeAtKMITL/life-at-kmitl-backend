import { DormReviewEntityRepository } from './db/dormReview-entity.repository';
import { DormReviewFactory } from './dormReview.factory';
import { CreateDormReviewCommandHandler } from './commands/create-dormReview/create-dormReview.handler';

import { DormReviewController } from './dorm-review.controller';
import { UserSchema, userSchema } from './../user/db/user-schema';
import { DormQueryHandlers } from './queries/index';
import { DormDtoRepository } from './db/dorm-dto.repository';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { getModelToken, MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { DormCommandHandlers } from './commands';
import { DormEntityRepository } from './db/dorm-entity.repository';
import { DormSchema } from './db/dorm-schema';
import { DormSchemaFactory } from './db/dorm-schema.factory';
import { DormController } from './dorm.controller';
import { DormFactory } from './dorm.factory';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { UserEntityRepository } from '../user/db/user-entity.repository';
import { UserSchemaFactory } from '../user/db/user-schema.factory';
import { DormReviewSchema } from './db/dormReview-schema';
import { DormReviewSchemaFactory } from './db/dormReview-schema.factory';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: DormSchema.name, schema: SchemaFactory.createForClass(DormSchema) }]),
    MongooseModule.forFeature([
      { name: DormReviewSchema.name, schema: SchemaFactory.createForClass(DormReviewSchema) },
    ]),
    MongooseModule.forFeature([{ name: UserSchema.name, schema: userSchema }]),
    AuthModule,
    UserModule,
  ],
  controllers: [DormController, DormReviewController],
  providers: [
    DormFactory,
    DormEntityRepository,
    DormSchemaFactory,
    DormDtoRepository,
    DormReviewSchema,
    DormReviewFactory,
    DormReviewEntityRepository,
    DormReviewSchemaFactory,
    UserEntityRepository,
    UserSchemaFactory,
    ...DormCommandHandlers,
    ...DormQueryHandlers,
  ],
})
export class DormModule {}
