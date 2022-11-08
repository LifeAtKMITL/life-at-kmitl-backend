import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { LoginDto } from './dto/login.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserSchema } from '../user/db/user-schema';
import APIFeatures from 'src/utils/apiFeatures.utils';
import { images, usernames } from 'src/utils/fakeData.utils';

@Injectable()
export class AuthService {
  constructor(@InjectModel(UserSchema.name) private userModel: Model<UserSchema>, private jwtService: JwtService) {}

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { userId } = loginDto;

    const user = await this.userModel.findOne({ userId });

    // Register
    if (!user) {
      return this.register(userId);
    }

    const token = await APIFeatures.assignJwtToken(user.userId, this.jwtService);

    return { token };
  }

  async register(userId: string): Promise<{ token: string }> {
    try {
      const username = usernames[Math.floor(Math.random() * usernames.length)];
      const image = images[Math.floor(Math.random() * images.length)];

      const user = await this.userModel.create({ _id: new mongoose.Types.ObjectId(), userId, username, image });

      const token = await APIFeatures.assignJwtToken(user.userId, this.jwtService);

      return { token };
    } catch (error) {
      console.log(error);
      throw new ConflictException('something error. read log.');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }
}
