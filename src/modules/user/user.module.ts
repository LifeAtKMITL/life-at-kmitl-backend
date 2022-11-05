import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { UserEntityRepository } from './db/user-entity.repository';
import { userSchema, UserSchema } from './db/user-schema';
import { UserSchemaFactory } from './db/user-schema.factory';
import { UserQueryHandlers } from './queries';
import { UserController } from './user.controller';

@Module({
  imports: [CqrsModule, AuthModule, MongooseModule.forFeature([{ name: UserSchema.name, schema: userSchema }])],
  controllers: [UserController],
  providers: [UserEntityRepository, UserSchemaFactory, ...UserQueryHandlers],
})
export class UserModule {}
