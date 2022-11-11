import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { GenEdSchema } from '../subject/db/gened-schema';
import { GenEdSchemaFactory } from '../subject/db/gened-schema.factory';
import { GenEdRepository } from '../subject/db/gened.repository';
import { UserCommandHandlers } from './commands';
import { UserEntityRepository } from './db/user-entity.repository';
import { userSchema, UserSchema } from './db/user-schema';
import { UserSchemaFactory } from './db/user-schema.factory';
import { UserQueryHandlers } from './queries';
import { UserSubjectController } from './user-subject.controller';
import { UserController } from './user.controller';

@Module({
  imports: [
    CqrsModule,
    AuthModule,
    MongooseModule.forFeature([{ name: UserSchema.name, schema: userSchema }]),
    MongooseModule.forFeature([{ name: GenEdSchema.name, schema: SchemaFactory.createForClass(GenEdSchema) }]),
  ],
  controllers: [UserController, UserSubjectController],
  providers: [
    UserEntityRepository,
    UserSchemaFactory,
    GenEdRepository,
    GenEdSchema,
    GenEdSchemaFactory,
    ...UserCommandHandlers,
    ...UserQueryHandlers,
  ],
})
export class UserModule {}
