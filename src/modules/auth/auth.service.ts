import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async login(createAuthDto: CreateAuthDto) {
    const { userId } = createAuthDto;
    const user = await this.userModel.findOne({ userId });

    // Login
    if (user) {
      return 'Login';
    }

    return this.register(userId);
  }

  register(userId: string) {
    console.log(userId);

    return 'Register';
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }
}
