import { HttpService } from '@nestjs/axios';
import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { LoginDto } from './dto/login.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserSchema } from '../user/db/user-schema';
import APIFeatures from 'src/utils/apiFeatures.utils';
import { images, usernames } from 'src/utils/fakeData.utils';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserSchema.name) private userModel: Model<UserSchema>,
    private jwtService: JwtService,
    private readonly httpService: HttpService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    console.log('login route');
    const { userId: tokenId } = loginDto;

    this.getLineProfileByTokenId(tokenId);

    const user = await this.userModel.findOne({ tokenId });

    // Register
    if (!user) {
      return this.register(tokenId);
    }

    const token = await APIFeatures.assignJwtToken(user.userId, this.jwtService);
    console.log(token);

    // return { token };
    return { token: '' };
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

  async getLineProfileByTokenId(tokenId: string) {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    const profilePayload = new URLSearchParams({
      id_token: tokenId,
      client_id: '1657631189',
    });

    try {
      const profile = (
        await firstValueFrom(this.httpService.post('https://api.line.me/oauth2/v2.1/verify', profilePayload, config))
      ).data;

      console.log(profile);

      return profile;
    } catch (error) {
      console.log(error);
      // throw new ConflictException(error);
    }
  }
}
