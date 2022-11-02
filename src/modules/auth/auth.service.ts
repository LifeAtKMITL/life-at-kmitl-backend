import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import APIFeatures from 'src/utils/apiFeatures.utils';
import { LoginDto } from './dto/login.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>, private jwtService: JwtService) {}

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
      const user = await this.userModel.create({ userId });

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
