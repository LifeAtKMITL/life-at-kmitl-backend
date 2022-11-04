import { Injectable } from '@nestjs/common';
import { UserSchema } from '../user/db/user-schema';

@Injectable()
export class ProductService {
  findAll() {
    return `This action returns all product`;
  }

  create(user: UserSchema) {
    console.log(user);
    return `create by ${user.username}`;
  }
}
