import { Injectable } from '@nestjs/common';
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class ProductService {
  findAll() {
    return `This action returns all product`;
  }

  create(user: User) {
    console.log(user);
    return `create by ${user.username}`;
  }
}
