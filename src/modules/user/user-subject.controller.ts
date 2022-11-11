import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { AddFavoriteSubjectCommand } from './commands/add-favorite-gened/add-favorite-subject.handler';
import { UserSchema } from './db/user-schema';
import { AddFavoriteSubjectRequest } from './dtos/add-favorite-subject.dto';

@Controller('user/subject/')
export class UserSubjectController {
  constructor(private readonly commandBus: CommandBus) {}

  /*
   * DESC: API to add subject to user
   * ROUTE: subject/favorite
   * METHOD: PUT + with jwt-auth
   * RES: void
   */
  @Put('favorite')
  @UseGuards(AuthGuard())
  async addFavoriteSubject(
    @CurrentUser() user: UserSchema,
    @Body() addFavoriteSubjectRequest: AddFavoriteSubjectRequest,
  ): Promise<void> {
    return this.commandBus.execute<AddFavoriteSubjectCommand, void>(
      new AddFavoriteSubjectCommand(user.userId, addFavoriteSubjectRequest),
    );
  }
}
