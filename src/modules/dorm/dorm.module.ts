import { UserSchema, userSchema } from './../user/db/user-schema';
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
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { UserEntityRepository } from '../user/db/user-entity.repository';
import { UserSchemaFactory } from '../user/db/user-schema.factory';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: DormSchema.name, schema: SchemaFactory.createForClass(DormSchema) }]),
    MongooseModule.forFeature([{ name: UserSchema.name, schema: userSchema }]),
    AuthModule,
    UserModule,
  ],
  controllers: [DormController],
  providers: [
    DormFactory,
    DormEntityRepository,
    DormSchemaFactory,
    DormDtoRepository,
    UserEntityRepository,
    UserSchemaFactory,
    ...DormCommandHandlers,
    ...DormQueryHandlers,
  ],
})
export class DormModule {}
