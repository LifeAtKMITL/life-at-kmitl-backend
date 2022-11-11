import { Body, Controller, Delete, Put, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { AddFavoriteSubjectCommand } from './commands/add-favorite-gened/add-favorite-subject.handler';
import { RemoveFavoriteSubjectCommand } from './commands/remove-favorite-gened/remove-favorite-subject.handler';
import { UserSchema } from './db/user-schema';
import { AddFavoriteSubjectRequest } from './dtos/request/add-favorite-subject.dto';
import { RemoveFavoriteSubjectRequest } from './dtos/request/remove-favorite-subject.dto';

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

  /*
   * DESC: API to add subject to user
   * ROUTE: subject/favorite
   * METHOD: PUT + with jwt-auth
   * RES: void
   */
  @Delete('favorite')
  @UseGuards(AuthGuard())
  async removeFavoriteSubject(
    @CurrentUser() user: UserSchema,
    @Body() removeFavoriteSubjectRequest: RemoveFavoriteSubjectRequest,
  ): Promise<void> {
    return this.commandBus.execute<RemoveFavoriteSubjectCommand, void>(
      new RemoveFavoriteSubjectCommand(user.userId, removeFavoriteSubjectRequest),
    );
  }
}
