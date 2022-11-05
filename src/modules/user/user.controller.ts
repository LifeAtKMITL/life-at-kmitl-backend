import { Controller, Get, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserSchema } from './db/user-schema';
import { GetUserByIdQuery } from './queries/get-user-by-id.query-handler';
import { User } from './User';

@Controller('user')
export class UserController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Get()
  @UseGuards(AuthGuard())
  async getUserById(@CurrentUser() user: UserSchema): Promise<User> {
    return this.queryBus.execute<GetUserByIdQuery, User>(new GetUserByIdQuery(user.userId));
  }
}
