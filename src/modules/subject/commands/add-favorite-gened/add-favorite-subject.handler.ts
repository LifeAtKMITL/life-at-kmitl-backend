import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserEntityRepository } from 'src/modules/user/db/user-entity.repository';
import { AddFavoriteSubjectRequest } from '../../dtos/request/add-favorite-subject.dto';

export class AddFavoriteSubjectCommand {
  constructor(public readonly userId: string, public readonly saveFavoriteSubjectRequest: AddFavoriteSubjectRequest) {}
}

@CommandHandler(AddFavoriteSubjectCommand)
export class AddFavoriteSubjectCommandHandler implements ICommandHandler {
  constructor(private readonly userEntityRepository: UserEntityRepository) {}

  async execute(addFavoriteSubjectCommand: AddFavoriteSubjectCommand): Promise<any> {
    const { userId, saveFavoriteSubjectRequest } = addFavoriteSubjectCommand;
    const newUser = await this.userEntityRepository.findOneById(userId);
    newUser.addFavoriteSubject(saveFavoriteSubjectRequest);
    await this.userEntityRepository.findOneAndReplaceById(newUser.getUserId(), newUser);
  }
}
