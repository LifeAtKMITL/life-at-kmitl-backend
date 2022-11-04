import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { BaseEntityRepository } from 'src/database/base-entity.repository';
import { User } from '../User';
import { UserSchema } from './user-schema';
import { UserSchemaFactory } from './user-schema.factory';

@Injectable()
export class UserEntityRepository extends BaseEntityRepository<UserSchema, User> {
  constructor(@InjectModel(UserSchema.name) userModel: Model<UserSchema>, userSchemaFactory: UserSchemaFactory) {
    super(userModel, userSchemaFactory);
  }

  async findOneById(id: string): Promise<User> {
    return this.findOne({ userId: id } as FilterQuery<UserSchema>);
  }
}
