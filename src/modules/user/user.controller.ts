import { Controller, Get, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserSchema } from './db/user-schema';
import { UserProfileSubjectDto } from './dtos/response/user-profile-subject.dto';
import { GetUserByIdQuery } from './queries/get-user-by-id.query-handler';
import { GetUserProfileSubjectQuery } from './queries/get-user-profile-subject.handler';
import { User } from './User';

@Controller('user')
export class UserController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Get()
  @UseGuards(AuthGuard())
  async getUserById(@CurrentUser() user: UserSchema): Promise<User> {
    return this.queryBus.execute<GetUserByIdQuery, User>(new GetUserByIdQuery(user.userId));
  }

  @Get('profile/subject')
  @UseGuards(AuthGuard())
  async getUserProfileSUbject(@CurrentUser() user: UserSchema): Promise<UserProfileSubjectDto> {
    return this.queryBus.execute<GetUserProfileSubjectQuery, UserProfileSubjectDto>(
      new GetUserProfileSubjectQuery(user.userId),
    );
  }
}
