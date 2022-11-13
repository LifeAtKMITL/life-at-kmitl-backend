import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserEntityRepository } from 'src/modules/user/db/user-entity.repository';
import { AddBookmarkBlogreviewRequest } from '../../dtos/request/add-bookmark-blogreview.dto';

export class AddBookmarkBlogreviewCommand {
  constructor(
    public readonly userId: string,
    public readonly saveBookmarkBlogreviewRequest: AddBookmarkBlogreviewRequest,
  ) {}
}

@CommandHandler(AddBookmarkBlogreviewCommand)
export class AddBookmarkBlogreviewCommandHandler implements ICommandHandler {
  constructor(private readonly userEntityRepository: UserEntityRepository) {}

  async execute(addBookmarkBlogreviewCommand: AddBookmarkBlogreviewCommand): Promise<any> {
    const { userId, saveBookmarkBlogreviewRequest } = addBookmarkBlogreviewCommand;
    const newUser = await this.userEntityRepository.findOneById(userId);
    newUser.addBookmarkBlogreview(saveBookmarkBlogreviewRequest);
    await this.userEntityRepository.findOneAndReplaceById(newUser.getUserId(), newUser);
  }
}
